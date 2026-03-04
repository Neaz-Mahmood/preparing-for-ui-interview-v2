import { useState, useRef, useCallback, useMemo } from 'react'

/** Represents the current lifecycle status of the file upload */
export type TUploadStatus = 'idle' | 'uploading' | 'paused' | 'completed' | 'cancelled' | 'error'

/** The state of the file upload exposed to the consumer */
export type TUploadState = {
  /** The current status. 'idle' means no upload has started. */
  status: TUploadStatus
  /** The percentage of completion, ranging from 0 to 100 */
  progress: number
  /** The current upload speed in KB/s */
  speed: number // KB/s
  /** The absolute number of bytes successfully uploaded so far */
  bytes: number
  /** The estimated time remaining in milliseconds. Null if unknown or not uploading. */
  remainingTimeMs: number | null
  /** If the status is 'error', contains the error message */
  error: string | null
}

/** The functions available to imperatively control the upload process */
export type TUploadControls = {
  /**
   * Starts an upload for a given File, optionally starting from a specific byte offset.
   * @param file The file object from the browser to upload
   * @param from The byte offset to start slice from (default 0)
   */
  start: (file: File, from?: number) => void
  /**
   * Pauses the active upload, severing the network connection but maintaining state.
   */
  pause: () => void
  /**
   * Resumes a paused upload by finding the last known byte offset and starting again.
   * @param file The exact same file object previously paused.
   */
  resume: (file: File) => void
  /**
   * Hard aborts the upload and completely resets the state back to 'idle'.
   */
  cancel: () => void
}

const DEFAULT_STATE: TUploadState = {
  status: 'idle',
  progress: 0,
  speed: 0,
  bytes: 0,
  remainingTimeMs: null,
  error: null,
}

const UPLOAD_API_URL = 'http://localhost:3000/api/upload'

/**
 * A custom hook to manage the state and logic of a chunked file upload over XMLHttpRequest.
 * Abstracts away the XMLHttpRequest internals and provides a clean React-friendly API.
 *
 * @returns A tuple containing `[state, controls]`.
 */
export function useFileUpload(): [TUploadState, TUploadControls] {
  // Public-facing state of the upload.
  const [state, setState] = useState<TUploadState>(DEFAULT_STATE)

  // Track the active request to allow aborting it dynamically when paused/cancelled.
  const xhrRef = useRef<XMLHttpRequest | null>(null)

  // Track metrics for speed calculation. Records the absolute timestamp and loaded bytes
  // whenever we recalculate speed to figure out the delta over time.
  const metricsRef = useRef({ lastLoaded: 0, lastTime: 0 })

  // Track current successfully uploaded offset so we can `slice()` correctly when resuming.
  const offsetRef = useRef(0)

  // Helper to silently kill active requests without firing error events back to state.
  const cleanup = useCallback(() => {
    if (xhrRef.current) {
      xhrRef.current.abort()
      xhrRef.current = null
    }
  }, [])

  const start = useCallback(
    (file: File, from: number = 0) => {
      cleanup()

      offsetRef.current = from
      metricsRef.current = { lastLoaded: from, lastTime: Date.now() }

      setState({
        ...DEFAULT_STATE,
        status: 'uploading',
        progress: file.size > 0 ? (from / file.size) * 100 : 0,
        bytes: from,
      })

      const xhr = new XMLHttpRequest()
      xhrRef.current = xhr

      // Handle normal progression of the upload
      xhr.upload.onprogress = (e) => {
        if (!e.lengthComputable) return

        const totalLoaded = from + e.loaded
        offsetRef.current = totalLoaded

        const now = Date.now()
        const timeDiffMs = now - metricsRef.current.lastTime

        setState((prev) => {
          let speed = prev.speed

          // Update speed every 500ms to avoid UI jitter (throttling metrics)
          if (timeDiffMs >= 500) {
            const loadedDiff = totalLoaded - metricsRef.current.lastLoaded
            speed = loadedDiff / 1024 / (timeDiffMs / 1000) // KB/s
            metricsRef.current = { lastLoaded: totalLoaded, lastTime: now }
          }

          const progress = file.size > 0 ? Math.min(100, (totalLoaded / file.size) * 100) : 0

          let remainingTimeMs = null
          if (speed > 0) {
            const remainingKB = (file.size - totalLoaded) / 1024
            remainingTimeMs = (remainingKB / speed) * 1000
          }

          return {
            ...prev,
            status: 'uploading',
            progress,
            speed,
            bytes: totalLoaded,
            remainingTimeMs,
          }
        })
      }

      // Handle completion logic
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          offsetRef.current = file.size
          setState((prev) => ({
            ...prev,
            status: 'completed',
            progress: 100,
            speed: 0,
            bytes: file.size,
            remainingTimeMs: 0,
          }))
        } else {
          setState((prev) => ({
            ...prev,
            status: 'error',
            error: 'Upload failed',
            remainingTimeMs: null,
          }))
        }
      }

      // Handle network errors (offline, CORS, blocked)
      xhr.onerror = () =>
        setState((prev) => ({
          ...prev,
          status: 'error',
          error: 'Network error',
          remainingTimeMs: null,
        }))

      // Execute Request
      xhr.open('POST', UPLOAD_API_URL)
      xhr.setRequestHeader('X-File-Name', file.name)
      xhr.send(file.slice(from))
    },
    [cleanup],
  )

  const pause = useCallback(() => {
    cleanup()
    setState((prev) => ({ ...prev, status: 'paused', speed: 0, remainingTimeMs: null }))
  }, [cleanup])

  const resume = useCallback(
    (file: File) => {
      start(file, offsetRef.current)
    },
    [start],
  )

  const cancel = useCallback(() => {
    cleanup()
    offsetRef.current = 0
    setState(DEFAULT_STATE)
  }, [cleanup])

  const controls = useMemo<TUploadControls>(
    () => ({ start, pause, resume, cancel }),
    [start, pause, resume, cancel],
  )

  return [state, controls]
}
