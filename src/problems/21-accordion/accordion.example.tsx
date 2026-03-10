import { Accordion, type TAccordionItem } from './solution/accordion.react'
import { Accordion as AccordionStudent } from './accordion.react'
import { Accordion as AccordionVanilaStudent } from './accordion.vanila.tsx'
import { Accordion as AccordionVanilla } from './solution/accordion.vanila'
import { useEffect, useRef } from 'react'

const LOREM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. '
const LARGE_CONTENT = Array(50).fill(LOREM).join('')

const MOCK_DATA: TAccordionItem[] = [
  { id: '1', title: 'Section 1', content: LARGE_CONTENT },
  { id: '2', title: 'Section 2', content: LARGE_CONTENT },
  { id: '3', title: 'Section 3', content: LARGE_CONTENT },
  { id: '4', title: 'Section 4', content: LARGE_CONTENT },
  { id: '5', title: 'Section 5', content: LARGE_CONTENT },
]

export const AccordionExample = () => {
  return <Accordion items={MOCK_DATA} />
}

export const AccordionVanillaExample = () => {
  const rootRef = useRef<HTMLDivElement>(null)
  const accordionRef = useRef<AccordionVanilla | null>(null)

  useEffect(() => {
    if (!rootRef.current) return

    accordionRef.current = new AccordionVanilla({
      root: rootRef.current,
      items: MOCK_DATA,
    })

    accordionRef.current.render()

    return () => {
      accordionRef.current?.destroy()
      accordionRef.current = null
    }
  }, [])

  return <div ref={rootRef}></div>
}
export const AccordionStudentExample = () => {
  return <AccordionStudent items={MOCK_DATA} />
}
export const AccordionStudentVanillaExample = () => {
  const rootRef = useRef<HTMLDivElement>(null)
  const accordionRef = useRef<AccordionVanilaStudent | null>(null)

  useEffect(() => {
    if (!rootRef.current) return

    accordionRef.current = new AccordionVanilaStudent({
      root: rootRef.current,
      items: MOCK_DATA,
    })

    accordionRef.current.render()

    return () => {
      accordionRef.current?.destroy()
      accordionRef.current = null
    }
  }, [])

  return <div ref={rootRef}></div>
}
