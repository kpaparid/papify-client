"use server";

import { removeGoogleDriveTrack } from "@/features/api";
import { revalidatePath } from "next/cache";

export async function removeYoutubeQueryAction(storageId: string): Promise<void> {
  try {
    // const response = await removeYoutubeQuery(storageId)
    revalidatePath("/youtube");
  } catch (error) {
    console.error("Error deleting track:", error);
    throw error;
  }
}

export async function refetchYoutubeTracks(): Promise<void> {
  revalidatePath("/youtube");
}
