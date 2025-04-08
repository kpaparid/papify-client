"use client"
import { useRouter } from "next/navigation"
import { ReactNode } from "react"
import { Button } from "./ui/button"
import { redirect } from "next/navigation"

export default function Header({
  title,
  subtitle,
  hasBack,
}: {
  title: ReactNode
  subtitle: ReactNode
  hasBack?: boolean
}) {
  const router = useRouter()

  return (
    <div>
      {hasBack && (
        <Button onClick={() => router.back()} className='mb-5' variant={"link"}>
          Back
        </Button>
      )}
      <div className='flex flex-col gap-1'>
        <h1 className='text-3xl font-bold tracking-tight'>{title}</h1>
        <p className='text-muted-foreground'>{subtitle}</p>
      </div>
    </div>
  )
}
