import { ReactNode } from "react"

export default function Header({
  title,
  subtitle,
}: {
  title: ReactNode
  subtitle: ReactNode
}) {
  return (
    <div className='flex flex-col gap-1'>
      <h1 className='text-3xl font-bold tracking-tight'>{title}</h1>
      <p className='text-muted-foreground'>{subtitle}</p>
    </div>
  )
}
