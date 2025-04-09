"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="inline-flex items-center text-foreground font-semibold hover:brightness-125 mb-8 transition cursor-pointer"
    >
      <ChevronLeft className="mr-1 h-5 w-5" />
      Back
    </button>
  );
}

export default BackButton;
