import { GPTComponent } from './solution/gpt-chat.react'
import { GptChat as GptChatStudent } from './gpt-chat.react'
import { GptChat as GptChatVanilaStudent } from './gpt-chat.vanila'
import { GPTChat } from './solution/gpt-chat.vanila'
import { useEffect, useRef } from 'react'

export const GPTComponentExample = () => <GPTComponent />

export const GPTChatVanillaExample = () => {
  const rootRef = useRef<HTMLDivElement>(null)
  const instanceRef = useRef<GPTChat | null>(null)

  useEffect(() => {
    if (!rootRef.current) return
    instanceRef.current = new GPTChat({ root: rootRef.current })
    instanceRef.current.render()

    return () => {
      instanceRef.current?.destroy()
      instanceRef.current = null
    }
  }, [])

  return <div ref={rootRef} />
}
export const GptChatStudentExample = () => {
  return <GptChatStudent />
}
export const GptChatStudentVanillaExample = () => {
  return <div>Student Vanilla: TODO implement wrapper</div>
}
