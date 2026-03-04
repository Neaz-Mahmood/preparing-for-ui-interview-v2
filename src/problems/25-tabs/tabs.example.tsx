import { useRef, useEffect } from 'react'
import { Tabs, Tab } from './solution/tabs.react'
import { Tabs as VanillaTabs } from './solution/tabs.vanila'
import { Tabs as StudentTabs, Tab as StudentTab } from './tabs.react'
import { Tabs as StudentVanillaTabs } from './tabs.vanila'

export function TabsExample() {
  return (
    <Tabs defaultTab="Tab 1">
      <Tab name="Tab 1">Content 1</Tab>
      <Tab name="Tab 2">Content 2</Tab>
      <Tab name="Tab 3">Content 3</Tab>
    </Tabs>
  )
}

export function TabsVanillaExample() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!rootRef.current) return

    const tabs = new VanillaTabs({
      root: rootRef.current,
      className: [],
      tabs: [
        { name: 'Tab 1', content: '<div>Content 1</div>' },
        { name: 'Tab 2', content: '<div>Content 2</div>' },
        { name: 'Tab 3', content: '<div>Content 3</div>' },
      ],
    })

    tabs.render()

    return () => tabs.destroy()
  }, [])

  return <div ref={rootRef}></div>
}

export function TabsStudentExample() {
  return (
    <StudentTabs defaultTab="Tab 1">
      <StudentTab name="Tab 1">Content 1</StudentTab>
      <StudentTab name="Tab 2">Content 2</StudentTab>
      <StudentTab name="Tab 3">Content 3</StudentTab>
    </StudentTabs>
  )
}

export function TabsStudentVanillaExample() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!rootRef.current) return

    const tabs = new StudentVanillaTabs({
      root: rootRef.current,
      className: [],
      tabs: [
        { name: 'Tab 1', content: '<div>Content 1</div>' },
        { name: 'Tab 2', content: '<div>Content 2</div>' },
        { name: 'Tab 3', content: '<div>Content 3</div>' },
      ],
    })

    tabs.render()

    return () => tabs.destroy()
  }, [])

  return <div ref={rootRef}></div>
}
