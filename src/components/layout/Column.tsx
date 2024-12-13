export default function Column({
  children,
  className,
  padding,
  flex,
}: {
  children: React.ReactNode;
  className?: string;
  padding?: string;
  flex?: string;
}) {
  return (
    <div className={`
      ${className || ""} 
      column 
      h-full 
      ${flex || "flex-1"} 
      ${padding || "p-4"}
    `}>{children}</div>
  )
}
