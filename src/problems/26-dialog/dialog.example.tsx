import { useState, useRef, useEffect } from 'react'
import { Dialog as DialogStudent } from './dialog.react'
import { Dialog } from './solution/dialog.react'
import { Dialog as VanillaDialog } from './solution/dialog.vanila'
import { Dialog as VanillaDialogStudent } from './dialog.vanila'

export function DialogExample() {
  const [open, setOpen] = useState(false)

  const handleConfirm = () => {
    alert('Confirmed')
    setOpen(false)
  }
  const handleCancel = () => {
    alert('Cancelled')
    setOpen(false)
  }

  return (
    <div>
      <button onClick={() => setOpen(true)}>Open Dialog</button>
      <Dialog open={open} onConfirm={handleConfirm} onCancel={handleCancel}>
        <h2>Confirm Action</h2>
        <p>Are you sure you want to proceed?</p>
      </Dialog>
    </div>
  )
}

export function DialogVanillaExample() {
  const rootRef = useRef<HTMLDivElement>(null)
  const dialogRef = useRef<VanillaDialog | null>(null)

  useEffect(() => {
    if (!rootRef.current) return
    dialogRef.current = new VanillaDialog({
      root: rootRef.current,
      content: `
        <h2>Confirm Action</h2>
        <p>Are you sure you want to proceed?</p>
      `,
      onConfirm: () => alert('Confirmed'),
      onCancel: () => alert('Cancelled'),
    })
    dialogRef.current.render()
    return () => {
      dialogRef.current?.destroy()
      dialogRef.current = null
    }
  }, [])

  const handleOpen = () => {
    dialogRef.current?.open()
  }

  return (
    <div>
      <button onClick={handleOpen}>Open Dialog</button>
      <div ref={rootRef}></div>
    </div>
  )
}
export const DialogStudentExample = () => {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <button onClick={() => setOpen(true)}>Open Dialog</button>
      <DialogStudent
        open={open}
        onConfirm={() => {
          alert('Confirmed')
          setOpen(false)
        }}
        onCancel={() => {
          alert('Cancelled')
          setOpen(false)
        }}
      >
        <h2>Confirm Action</h2>
        <p>Are you sure you want to proceed?</p>
      </DialogStudent>
    </div>
  )
}

export function DialogStudentVanillaExample() {
  const rootRef = useRef<HTMLDivElement>(null)
  const dialogRef = useRef<VanillaDialogStudent | null>(null)

  useEffect(() => {
    if (!rootRef.current) return
    dialogRef.current = new VanillaDialogStudent({
      root: rootRef.current,
      content: `
        <h2>Confirm Action</h2>
        <p>Are you sure you want to proceed?</p>
      `,
      onConfirm: () => alert('Confirmed'),
      onCancel: () => alert('Cancelled'),
    })
    dialogRef.current.render()
    return () => {
      dialogRef.current?.destroy()
      dialogRef.current = null
    }
  }, [])

  const handleOpen = () => {
    dialogRef.current?.open()
  }

  return (
    <div>
      <button onClick={handleOpen}>Open Dialog</button>
      <div ref={rootRef}></div>
    </div>
  )
}
