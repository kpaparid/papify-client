"use server"
import { revalidateTag } from "next/cache"
import {
  addCategory,
  deleteCategory,
  editCategory,
  deleteAllTracks,
} from "../api"
export async function deleteAllTracksAction(): Promise<void> {
  try {
    const response = await deleteAllTracks() // Revalidate the tracks page to show updated data
    revalidateTag("savedTracks")
  } catch (error) {
    console.error("Error deleting all tracks:", error)
    throw error
  }
}
export async function deleteCategoryAction(category: string): Promise<void> {
  try {
    const response = await deleteCategory(category) // Revalidate the tracks page to show updated data
    revalidateTag("savedTracks")
  } catch (error) {
    console.error("Error deleting track:", error)
    throw error
  }
}

export async function editCategoryAction(
  category: string,
  newCategory: FormData
): Promise<void> {
  try {
    const newCategoryName = newCategory.get("category") as string
    console.log("Editing category:", category, "to", newCategoryName)
    if (category === newCategory.get("category")) {
      console.log("No changes made to the category name.")
      return
    }
    const response = await editCategory(category, newCategoryName) // Revalidate the tracks page to show updated data
    // revalidatePath("/categories")
    revalidateTag("savedTracks")
  } catch (error) {
    console.error("Error editing category:", error)
    throw error
  }
}

export async function addCategoryAction(newCategory: FormData): Promise<void> {
  try {
    const newCategoryName = newCategory.get("category") as string
    console.log("Adding new category:", newCategoryName)
    if (!newCategoryName) {
      console.error("No category name provided.")
      return
    }
    const response = await addCategory(newCategoryName) // Revalidate the tracks page to show updated data
    revalidateTag("savedTracks")
  } catch (error) {
    console.error("Error adding category:", error)
    throw error
  }
}
