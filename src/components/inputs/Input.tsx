import { useState } from "react"

export default function Input({ 
  type, 
  name, 
  label, 
  defaultValue,
  disabled,
  className,
  inputClassName,
  required, 
  placeholder,
  pattern,
  setHasError,
  onChange,
  errorMessage,
  onBlur,
  onKeyDown
}: { 
  type: string, 
  name: string, 
  label: string, 
  defaultValue?: string,
  className?: string,
  inputClassName?: string,
  disabled?: boolean,
  required?: boolean, 
  placeholder?: string,
  pattern?: RegExp,
  setHasError?: (hasError: React.SetStateAction<boolean>) => void,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
  errorMessage?: string,
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void,
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void,
}) {

  const [inputError, setInputError] = useState<string | null>(null)

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    onBlur?.(e)
    if (pattern && !pattern.test(e.target.value)) {
      setHasError?.(true)
      setInputError(errorMessage || 'Invalid input')
    } else {
      setHasError?.(false)
      setInputError(null)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(e)
  }

  return (
    <div className={`floating-label relative ${className}`}>
      <label htmlFor={name} className={`
        absolute text-md -translate-y-[10px] bg-input-bg scale-75 top-0 z-10 mx-2 px-1 origin-[0] transition-all duration-200 rounded-md
        pointer-events-none peer-focus:text-input-text peer-focus:top-0 peer-focus:scale-75 peer-focus:-translate-y-[10px] peer-focus:bg-input-bg peer-focus:text-input-text
        peer-placeholder-shown:scale-100
        rtl:peer-focus:translate-x-1/2 rtl:peer-focus:left-auto start-1 
        ${inputError ? 'text-red-500 peer-placeholder-shown:translate-y-4' : 'text-input-text peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2'}
      `}>
        {placeholder || label}
      </label>
      <input 
        type={type} 
        name={name} 
        required={required} 
        defaultValue={defaultValue}
        disabled={disabled}
        placeholder=" "
        onBlur={(e) => handleBlur(e)}
        onChange={(e) => handleChange(e)}
        onKeyDown={(e) => handleKeyDown(e)}
        className={`${inputClassName || ""}
        block px-4 pb-3 pt-4 w-full appearance-none 
        focus:outline-none focus:ring-0 focus:border-input-border-focus peer 
        bg-input-bg rounded-lg border border-input-border w-full relative cursor-pointer transition-all duration-300
        ${inputError ? 'border-red-500' : 'border-input-border'}
      `} />
      {inputError && <p className="text-red-500 text-sm">{inputError}</p>}
    </div>
  )
}