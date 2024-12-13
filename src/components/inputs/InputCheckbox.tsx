"use client";

export default function InputCheckbox({
  name,
  label,
  defaultChecked,
  className,
  onChange,
}: {
  name: string
  label: string
  defaultChecked?: boolean
  className?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {

  return (
    <div className={`flex flex-row gap-2 ${className || ""}`}>
      <input 
        type="checkbox" 
        className="w-4 h-4 mt-1" 
        name={name} 
        id={`${name}-checkbox`} 
        defaultChecked={defaultChecked}
        onChange={onChange}
      />
      <label htmlFor={`${name}-checkbox`} className="text-md">{label}</label>
    </div>
  )
}