"use client"

import { useState, useEffect } from "react"

interface SwitchProps {
  id: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  className?: string
}

export function Switch({ id, checked, onCheckedChange, className = "" }: SwitchProps) {
  const [isChecked, setIsChecked] = useState(checked)

  useEffect(() => {
    setIsChecked(checked)
  }, [checked])

  const handleChange = () => {
    const newValue = !isChecked
    setIsChecked(newValue)
    onCheckedChange(newValue)
  }

  return (
    <button
      type="button"
      role="switch"
      id={id}
      aria-checked={isChecked}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary/5 focus:ring-offset-2 ${
        isChecked ? "bg-primary" : "bg-gray-200"
      } ${className}`}
      onClick={handleChange}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          isChecked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  )
}

