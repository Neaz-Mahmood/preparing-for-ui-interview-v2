import { useToast, ToastProvider } from './solution/toast.react'
import { Toast as ToastStudent } from './toast.react'
import { Toast } from './solution/toast.vanila'
import { Toast as StudentVanillaToast } from './toast.vanila'
import { useEffect, useRef, type CSSProperties } from 'react'

let id = 0

const TOAST_CONTAINER_STYLES: CSSProperties = {
  position: 'absolute',
  left: 0,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'end',
  overflow: 'hidden',
  height: '100%',
  bottom: 0,
  pointerEvents: 'none',
  zIndex: 9999,
}

function InnerToastExample() {
  const { toast } = useToast()
  return (
    <button
      onClick={() =>
        toast({
          id: `${id++}`,
          text: `Toast message: ${id}`,
        })
      }
    >
      Click on me
    </button>
  )
}

export function ToastExample() {
  return (
    <>
      <div id="toast-container-example" style={TOAST_CONTAINER_STYLES}></div>
      <ToastProvider target="#toast-container-example">
        <InnerToastExample />
      </ToastProvider>
    </>
  )
}

export function ToastVanillaExample() {
  const toastContainerRef = useRef<HTMLDivElement>(null)
  const toastRef = useRef<Toast | null>(null)

  useEffect(() => {
    if (!toastContainerRef.current) return

    toastRef.current = new Toast({
      root: toastContainerRef.current,
    })
    toastRef.current.render()

    return () => {
      toastRef.current?.destroy()
      toastRef.current = null
    }
  }, [])

  return (
    <>
      <div ref={toastContainerRef} style={TOAST_CONTAINER_STYLES}></div>
      <button
        onClick={() => {
          toastRef.current?.toast({
            id: `${id++}`,
            text: `Vanilla Toast: ${id}`,
          })
        }}
      >
        Show Vanilla Toast
      </button>
    </>
  )
}
export const ToastStudentExample = () => {
  return <ToastStudent />
}

export function ToastStudentVanillaExample() {
  const toastContainerRef = useRef<HTMLDivElement>(null)
  const toastRef = useRef<StudentVanillaToast | null>(null)

  useEffect(() => {
    if (!toastContainerRef.current) return
    toastRef.current = new StudentVanillaToast({ root: toastContainerRef.current })
    if (toastRef.current.render) toastRef.current.render()
    return () => {
      toastRef.current?.destroy?.()
      toastRef.current = null
    }
  }, [])

  return (
    <>
      <div ref={toastContainerRef} style={TOAST_CONTAINER_STYLES}></div>
      <button onClick={() => toastRef.current?.toast?.({ id: '1', text: 'Student Toast' })}>
        Show Student Vanilla Toast
      </button>
    </>
  )
}
