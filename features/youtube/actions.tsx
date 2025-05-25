"use server";

import { removeGoogleDriveTrack, removeYoutubeQuery } from "@/features/api";
import { revalidatePath } from "next/cache";

export async function removeYoutubeQueryAction(id: string): Promise<void> {
  try {
    const response = await removeYoutubeQuery(id);
    revalidatePath("/youtube");
  } catch (error) {
    console.error("Error deleting track:", error);
    throw error;
  }
}

export async function refetchYoutubeTracks(): Promise<void> {
  revalidatePath("/youtube");
}
