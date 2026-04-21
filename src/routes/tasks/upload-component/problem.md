# Upload Component

## Goal

Build a file upload UI that uses a `useFileUpload` hook. It should display a file picker, progress bar, speed, time-remaining, and contextual control buttons (Pause, Resume, Cancel, Upload Another).

## Requirements

### Core Functionality

1. **File selection**: Styled button that triggers a hidden `<input type="file">`.
2. **Auto-start**: Upload begins immediately after file selection.
3. **Progress display**: Progress bar reflects bytes sent.
4. **Speed & ETA**: Formatted upload speed (KB/s or MB/s) and remaining time.
5. **Controls**: Contextual buttons based on upload status:
   - `uploading` → Pause, Cancel
   - `paused` → Resume, Cancel
   - `completed` → Upload Another
   - `error` → error message displayed

### Formatting Utilities

```ts
formatSpeed(512)    // "512 KB/s"
formatSpeed(2048)   // "2.00 MB/s"
formatSpeed(0)      // ""

formatTime(8500)    // "9s left"
formatTime(125000)  // "2m 5s left"
formatTime(null)    // ""
```

## Walkthrough

### Step 1 — Wire up the hook

```ts
const [uploadState, uploadControls] = useFileUpload()
const [file, setFile] = useState<File | null>(null)
const fileInputRef = useRef<HTMLInputElement>(null)
```

### Step 2 — File selection handler

```ts
const handleFileChange = (e) => {
  const selectedFile = e.target.files[0]
  setFile(selectedFile)
  uploadControls.start(selectedFile)
}
```

### Step 3 — Conditional rendering

Based on `uploadState.status`, show different UI:

- No file → "Select File" button
- Has file → file name, progress bar, speed, controls

### Step 4 — Control handlers

- **Pause**: `uploadControls.pause()`
- **Resume**: `uploadControls.resume(file)` — needs the original `File` object
- **Cancel**: `uploadControls.cancel()`, clear file, reset input
- **Upload Another**: Cancel + trigger file picker again

## Why keep the File in state

The `resume()` function needs the original `File` object to call `file.slice(offset)`. The hook doesn't store the file internally (it's stateless regarding the file), so the component must hold onto it.

## Resetting the file input

After cancel or "Upload Another", reset the file input by setting `fileInputRef.current.value = ''`. Otherwise, selecting the same file again won't trigger `onChange`.

## Edge Cases

| Scenario                         | Expected                               |
| -------------------------------- | -------------------------------------- |
| Select file → starts immediately | Progress bar appears                   |
| Pause → Resume                   | Upload continues from where it stopped |
| Cancel → Select new file         | Previous upload fully reset            |
| Upload error                     | Error message shown, Cancel available  |
| Very fast upload (small file)    | May jump straight to completed         |
| Upload Another after completion  | File input reset, ready for new file   |

## Verification

1. Click "Select File" → file picker opens.
2. Select file → upload starts, progress bar fills.
3. Speed and ETA update during upload.
4. Pause → progress stops, Resume button appears.
5. Resume → upload continues.
6. Cancel → state resets, "Select File" button returns.
7. Complete → "Upload Another" button appears.
