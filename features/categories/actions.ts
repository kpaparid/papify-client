"use server"
import { revalidatePath } from "next/cache"
import { deleteCategory, editCategory } from "../api"

export async function deleteCategoryAction(category: string): Promise<void> {
  try {
    const response = await deleteCategory(category) // Revalidate the tracks page to show updated data
    revalidatePath("/categories")
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
  } catch (error) {
    console.error("Error editing category:", error)
    throw error
  }
}
