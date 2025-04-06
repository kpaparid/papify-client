"use server"

import { removeGoogleDriveTrack } from "@/app/api"
import { revalidatePath } from "next/cache"

export async function removeGoogleDriveTrackAction(
  storageId: string
): Promise<void> {
  try {
    const response = await removeGoogleDriveTrack(storageId) // Revalidate the tracks page to show updated data
    revalidatePath("/google-drive")
  } catch (error) {
    console.error("Error deleting track:", error)
    throw error
  }
}

export async function refetchGoogleDriveTracks(): Promise<void> {
  revalidatePath("/google-drive")
}
