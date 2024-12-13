"use client"

import { useState } from "react"
// import Icon from "./Icon"

interface DropdownProps {
  name: string
  label?: string
  options: { value: string, label: string }[]
  className?: string
  classNameButton?: string
  classNameOption?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  buttonType?: 'primary' | 'secondary' | 'tertiary'
  outline?: boolean
  defaultValue?: string
  defaultOption?: { value: string, label: string }
}
export default function Dropdown(props: DropdownProps) {

  const storedOption = props.options.find((option) => option.value === props.defaultValue) || props.defaultOption
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState(storedOption)

  return (
    <div className={`dropdown relative ${props.className || ''}`}>
      {props.label && <label className={`text-xs left-2 px-1 block absolute
        ${props.disabled ? 'top-2 text-gray-700' : 'text-gray-500 -top-[8px]'}
      `}>
        <span className="absolute bg-input-bg h-[50%] w-full bottom-0 left-0"></span>
        <span className="relative z-10 stroke-white stroke">{props.label}</span>
      </label>}
      <div
        className={`dropdown--button dropdown--${props.name} ${props.classNameButton || ''} 
          cursor-pointer flex flex-row gap-1 items-center rounded-md border border-input-border px-3
          ${props.disabled ? 'bg-gray-50 pt-5 pb-2 pointer-events-none' : 'bg-input-bg pt-4 pb-3'}
        `}
        onClick={() => !props.disabled && setIsOpen(!isOpen)}
      >
        <span className={`flex-1 value
          ${props.disabled ? 'text-gray-800' : 'black'}
        `}>
          {selectedOption?.label || storedOption?.label}
        </span>
        {/* {!props.disabled && <Icon
          name="chevron-down"
          alt="Chevron Down"
          className={`w-[12px] h-[12px] stroke-black transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />} */}
      </div>
      <div className={`
          dropdown--content absolute z-[999] top-[100%] bg-input-bg mt-1 w-full rounded-md transition-all duration-300 transition-all duration-300 overflow-hidden
          ${isOpen ? 'max-h-[240px] shadow-[0_0_0_1px_rgba(0,0,0,0.25)] !overflow-auto' : 'max-h-0'} 
        `}>
        {props.options.map((option, index) => {
          const isActive = option.value === selectedOption?.value
          return (
            <div key={index} className={`relative hover:bg-gray-100 transition-all duration-200 ${isActive ? "bg-gray-50 pointer-events-none" : "bg-input-bg"}`}>
              <input
              name={props.name}
              className={`
              dropdown--option absolute appearance-none cursor-pointer bg-transparent w-full h-full text-left
              ${props.classNameOption || ''}
            `}
              id={`dropdown-value-${option.value}`}
              onChange={(e) => {
                console.log("[onChange] e", e);
                props.onChange && props.onChange(e)
                setIsOpen(false)
                setSelectedOption(option)
              }}
              type="radio"
              value={option.value}
              // checked={isActive}
              defaultChecked={props.defaultOption?.value === option.value}
              disabled={props.disabled || isActive}
            />
            <label htmlFor={option.value} className="px-3 py-4 block">{option.label}</label>
          </div>
        )})}
      </div>
    </div>
  )
}