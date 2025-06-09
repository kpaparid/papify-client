import { SetCategoryModal } from "@/features/categories/set-category-modal"
import { notFound } from "next/navigation"

export default async function Page({
  params,
}: {
  params: { category: string }
}) {
  const p = await params
  console.log("params", p)
  if (!p.category) return notFound()

  return <SetCategoryModal category={p.category} />
}
