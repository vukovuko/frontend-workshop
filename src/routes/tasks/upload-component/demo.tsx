import { UploadComponent } from './solution'

export function Demo() {
  return (
    <div className="space-y-2">
      <div className="text-sm text-muted-foreground">
        Uploads POST to <code>/api/upload</code>. The server discards the bytes but responds 200 so
        progress/completion events fire correctly. Try picking a large file and hitting Pause
        mid-upload.
      </div>
      <UploadComponent />
    </div>
  )
}
