# useFileUpload Hook

## Goal

Build a custom React hook that manages chunked file uploads with pause, resume, and cancel. Uses `XMLHttpRequest` for real upload progress events (which `fetch` doesn't expose).

## API

```ts
type TUploadStatus = 'idle' | 'uploading' | 'paused' | 'completed' | 'error'

type TUploadState = {
  status: TUploadStatus
  progress: number           // 0..100
  speed: number              // KB/s
  bytes: number              // uploaded bytes
  remainingTimeMs: number | null
  error?: string
}

type TUploadControls = {
  start: (file: File) => void
  pause: () => void
  resume: (file: File) => void
  cancel: () => void
}

function useFileUpload(): [TUploadState, TUploadControls]
```

## Why XMLHttpRequest and not fetch

`fetch()` has no way to observe upload progress. `XMLHttpRequest.upload.addEventListener('progress', ...)` fires as bytes are sent to the server — which is the only API that gives you real progress for uploads.

## Pause and Resume

`XMLHttpRequest.abort()` cancels the in-flight upload. To resume, the hook tracks how many bytes were sent (via the progress handler) and, on resume, starts a new XHR using `file.slice(offset)` as the body. The server receives only the remaining bytes.

## State Machine

```
  idle ──start──► uploading ──complete──► completed
                      │                       │
                      ├──pause──► paused      │
                      │            │          │
                      │        resume─────────┘
                      │
                      ├──cancel──► idle
                      │
                      └──error───► error ──cancel──► idle
```

## Requirements

### Core Functionality

1. `start(file)` initiates a POST to `/api/upload` with the full file.
2. `pause()` aborts the XHR and records the byte offset. Status becomes `paused`.
3. `resume(file)` starts a new XHR with `file.slice(offset)` as the body.
4. `cancel()` aborts the XHR and resets state to `idle`.

### State Tracking

- Use `useRef` for the XHR, offset, and byte counter — these don't drive renders.
- Use `useState` for the `state` object — consumers need re-renders when it changes.
- `progress.onprogress` handler computes speed (KB/s) and remaining time from `event.loaded` + elapsed time.

### Edge Cases

| Scenario                  | Expected                                                   |
| ------------------------- | ---------------------------------------------------------- |
| Call `start` while uploading | Previous XHR aborted, new one starts from byte 0          |
| Call `resume` after error | Starts from recorded offset                                 |
| Call `cancel` during idle | No-op                                                       |
| Server returns non-2xx    | Status → `error` with the HTTP code                         |
| Network error             | Status → `error` with a message                             |

## Verification

1. Wire the hook to a file input + buttons in a component.
2. Select a large file — `status` becomes `uploading`, `progress` climbs, `speed` and `bytes` update.
3. Pause — progress stops. Resume — progress continues from the same percentage.
4. Cancel — everything resets.
