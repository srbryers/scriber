export default function Button({
  children,
  type = "button",
  className,
  onClick,
  disabled,
  buttonSize = "md",
  buttonStyle = "primary",
  isOutlined = false,
}: {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  className?: string;
  onClick?: () => void | Promise<void>;
  disabled?: boolean;
  buttonSize?: "sm" | "md" | "lg";
  buttonStyle?: "primary" | "secondary" | "tertiary" | "black" | "white" | "transparent";
  isOutlined?: boolean;
}) {

  const buttonSizeClass = buttonSize === "sm" ? "py-2 px-4" : buttonSize === "lg" ? "py-4 px-8" : "py-3 px-6";
  const buttonClass = `button 
    ${buttonSizeClass} ${className || ""} ${disabled ? "disabled" : ""} 
    ${isOutlined ? `border border-${buttonStyle}` : `bg-${buttonStyle}`}
    text-${buttonStyle === "primary" || buttonStyle === "secondary" || buttonStyle === "tertiary" ? "white" : "black"}
    disabled:bg-gray-200 disabled:text-gray-500 disabled:border-gray-500 disabled:cursor-not-allowed
    `;

  return <button
    type={type}
    className={buttonClass}
    onClick={onClick}
    disabled={disabled}
  >{children}</button>;
}