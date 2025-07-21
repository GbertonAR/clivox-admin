import * as React from "react"

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 ${className}`}
        {...props}
      >
        {children}
      </select>
    )
  }
)

Select.displayName = "Select"

interface SelectItemProps extends React.OptionHTMLAttributes<HTMLOptionElement> {}

const SelectItem = React.forwardRef<HTMLOptionElement, SelectItemProps>(
  ({ className, children, ...props }, ref) => (
    <option ref={ref} className={className} {...props}>
      {children}
    </option>
  )
)

SelectItem.displayName = "SelectItem"

export { Select, SelectItem }



