import { CheckboxTree, type TCheckboxItem } from './solution/checkboxes.react'
import { Checkboxes as CheckboxesStudent } from './checkboxes.react'
import { Checkboxes as CheckboxesVanilaStudent } from './checkboxes.vanila'
import { CheckboxTree as CheckboxTreeVanilla } from './solution/checkboxes.vanila'
import { useEffect, useRef } from 'react'

const MOCK_DATA: TCheckboxItem[] = [
  {
    id: '1',
    label: 'Electronics',
    children: [
      {
        id: '1-1',
        label: 'Phones',
        children: [
          { id: '1-1-1', label: 'iPhone' },
          { id: '1-1-2', label: 'Android' },
        ],
      },
      { id: '1-2', label: 'Laptops' },
    ],
  },
  {
    id: '2',
    label: 'Books',
    children: [
      { id: '2-1', label: 'Fiction' },
      { id: '2-2', label: 'Non-fiction' },
    ],
  },
]

export const CheckboxTreeExample = () => {
  return <CheckboxTree items={MOCK_DATA} />
}

export const CheckboxTreeVanillaExample = () => {
  const rootRef = useRef<HTMLDivElement>(null)
  const treeRef = useRef<CheckboxTreeVanilla | null>(null)

  useEffect(() => {
    if (!rootRef.current) return

    treeRef.current = new CheckboxTreeVanilla({
      root: rootRef.current,
      // Cast or ensure type compatibility. The vanilla component expects vanilla TCheckboxItem.
      // The structure is identical.
      items: structuredClone(MOCK_DATA) as any,
    })

    treeRef.current.render()

    return () => {
      treeRef.current?.destroy()
      treeRef.current = null
    }
  }, [])

  return <div ref={rootRef}></div>
}
export const CheckboxesStudentExample = () => {
  return <CheckboxesStudent />
}
export const CheckboxesStudentVanillaExample = () => {
  return <div>Student Vanilla: TODO implement wrapper</div>
}
