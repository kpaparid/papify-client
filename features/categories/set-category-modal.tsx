"use client"

import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import ActionButton from "@/features/spotify/components/action-button"
import { addCategoryAction, editCategoryAction } from "./actions"

export function SetCategoryModal({ category }: { category?: string }) {
  const router = useRouter()
  const handleClose = () => router.back()

  const action = category
    ? editCategoryAction.bind(null, category)
    : addCategoryAction

  const handleSave = async (e) => {
    return action(e).then(() => handleClose())
  }

  return (
    <Dialog open onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className='min-w-[750px] max-h-[90vh] p-6'>
        <form action={(e) => handleSave(e)} className='flex flex-col'>
          <DialogHeader className='pb-4'>
            <DialogTitle className='text-xl flex items-center gap-2'>
              {category ? "Edit" : "Add"} Category {category}
            </DialogTitle>
          </DialogHeader>

          <div className='flex gap-2 mb-4'>
            <Input
              name='category'
              defaultValue={category}
              placeholder='Category...'
              className='flex-1 bg-card hover:brightness-110 border border-primary'
            />
          </div>

          <DialogFooter className='mt-6 flex justify-between gap-2'>
            <Button
              variant='outline'
              className='cursor-pointer bg-card border-primary'
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              variant={"outline"}
              className='cursor-pointer bg-foreground! text-primary! hover:brightness-80 border-primary'
              type='submit'
            >
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
