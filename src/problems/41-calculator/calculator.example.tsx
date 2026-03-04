import { useEffect, useRef } from 'react'
import { Calculator as CalculatorStudent } from './calculator.react'
import { Calculator } from './solution/calculator.react'
import { Calculator as VanillaCalculator } from './solution/calculator.vanila'
import { Calculator as StudentVanillaCalculator } from './calculator.vanila'

export const CalculatorExample = () => {
  return <Calculator />
}

export const CalculatorVanillaExample = () => {
  const rootRef = useRef<HTMLElement>(null)
  const calculatorRef = useRef<VanillaCalculator | null>(null)

  useEffect(() => {
    if (!rootRef.current) return

    calculatorRef.current = new VanillaCalculator({
      root: rootRef.current,
    })

    calculatorRef.current.render()

    return () => {
      calculatorRef.current?.destroy()
      calculatorRef.current = null
    }
  }, [])

  return <section ref={rootRef} />
}
export const CalculatorStudentExample = () => {
  return <CalculatorStudent />
}

export const CalculatorStudentVanillaExample = () => {
  const rootRef = useRef<HTMLElement>(null)
  const calculatorRef = useRef<StudentVanillaCalculator | null>(null)

  useEffect(() => {
    if (!rootRef.current) return
    calculatorRef.current = new StudentVanillaCalculator({ root: rootRef.current })
    if (calculatorRef.current.render) calculatorRef.current.render()
    return () => {
      calculatorRef.current?.destroy?.()
      calculatorRef.current = null
    }
  }, [])

  return <section ref={rootRef} />
}
