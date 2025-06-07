"use server"
import { revalidatePath } from "next/cache"
import { deleteCategory } from "../api"

export async function deleteCategoryAction(category: string): Promise<void> {
  try {
    const response = await deleteCategory(category) // Revalidate the tracks page to show updated data
    revalidatePath("/categories")
  } catch (error) {
    console.error("Error deleting track:", error)
    throw error
  }
}
