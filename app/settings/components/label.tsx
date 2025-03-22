import type { LabelHTMLAttributes, ReactNode } from "react"

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode
  className?: string
}

export function Label({ children, className = "", ...props }: LabelProps) {
  return (
    <label className={`text-sm font-medium text-gray-700 ${className}`} {...props}>
      {children}
    </label>
  )
}

