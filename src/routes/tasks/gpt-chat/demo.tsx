import { GPTChat } from './solution'

export function Demo() {
  return (
    <div className="space-y-2">
      <div className="text-sm text-muted-foreground">
        Streams from <code>/api/stream-markdown</code>. Click Send, then Stop mid-response to see
        the abort path in action.
      </div>
      <GPTChat />
    </div>
  )
}
