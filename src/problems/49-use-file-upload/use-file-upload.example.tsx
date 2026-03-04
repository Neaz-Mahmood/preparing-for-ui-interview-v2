import { useRef } from 'react'
import { useFileUpload } from './solution/use-upload'

export const UseFileUploadExample = () => {
  const [state, { start, pause, resume, cancel }] = useFileUpload()
  const fileRef = useRef<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      fileRef.current = file
    }
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: 600 }}>
      <h2 style={{ marginBottom: 16 }}>useFileUpload Hook Demo</h2>

      <div style={{ marginBottom: '16px' }}>
        <input type="file" onChange={handleFileChange} />
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        <button
          onClick={() => fileRef.current && start(fileRef.current)}
          disabled={state.status === 'uploading' || state.status === 'paused'}
        >
          Start
        </button>
        <button onClick={pause} disabled={state.status !== 'uploading'}>
          Pause
        </button>
        <button
          onClick={() => fileRef.current && resume(fileRef.current)}
          disabled={state.status !== 'paused'}
        >
          Resume
        </button>
        <button
          onClick={cancel}
          disabled={['idle', 'completed', 'cancelled'].includes(state.status)}
        >
          Cancel
        </button>
      </div>

      <div>
        <h3 style={{ marginBottom: 8, fontSize: 14 }}>Hook State Output:</h3>
        <pre
          style={{
            padding: '16px',
            backgroundColor: '#1e1e1e',
            color: '#00ffcc',
            borderRadius: '8px',
            overflowX: 'auto',
            fontSize: 13,
          }}
        >
          {JSON.stringify(state, null, 2)}
        </pre>
      </div>
    </div>
  )
}
