import { type ReactNode, useEffect, useRef } from 'react'

type TDialogProps = {
  open: boolean
  onConfirm: () => void
  onCancel: () => void
  children: ReactNode
}

export function Dialog({ open, onConfirm, onCancel, children }: TDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const closingProgrammatically = useRef(false)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) {
      dialog.showModal()
    } else if (!open && dialog.open) {
      closingProgrammatically.current = true
      dialog.close()
    }
  }, [open])

  const handleClose = () => {
    if (closingProgrammatically.current) {
      closingProgrammatically.current = false
      return
    }
    onCancel()
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={handleClose}
      className="m-auto rounded-md border border-border p-6 bg-card text-foreground max-w-md w-[90vw] backdrop:bg-black/50"
    >
      <section className="py-2">{children}</section>
      <footer className="flex flex-row justify-between gap-2 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm rounded-md border border-border hover:bg-muted transition-colors"
        >
          Cancel
        </button>
        <button
          type="button"
          autoFocus
          onClick={onConfirm}
          className="px-4 py-2 text-sm rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Confirm
        </button>
      </footer>
    </dialog>
  )
}
