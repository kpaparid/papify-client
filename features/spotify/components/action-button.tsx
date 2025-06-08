"use client"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { cloneElement, ReactElement, ReactNode, useActionState } from "react"
import { FaSpinner } from "react-icons/fa"

export default function ActionButton({
  className,
  pendingClassName,
  icon,
  action,
  spinner,
  variant,
  size,
  children,
  disabled,
}: {
  className?: string
  icon?: ReactElement<any>
  pendingClassName?: string
  action: () => Promise<void> | void
  spinner?: boolean
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined
  size?: "icon" | "default" | "sm" | "lg" | null | undefined
  children?: ReactNode
  disabled?: boolean
}) {
  //   const action = toggleSpotifyTrackAction.bind(null, spotifyId, !isSaved);
  const [state, formAction, pending] = useActionState(action, null)

  return (
    <form action={formAction}>
      <Button
        disabled={disabled || pending}
        variant={variant}
        size={size}
        type='submit'
        className={cn(
          "[&:hover>svg]:fill-foreground cursor-pointer [&>svg]:size-4",
          className,
          pending && cn("animate-pulse", pendingClassName)
        )}
      >
        {pending && spinner ? (
          <FaSpinner className='animate-spin' />
        ) : (
          icon || children
        )}
      </Button>
    </form>
  )
}
