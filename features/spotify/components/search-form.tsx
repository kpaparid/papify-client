"use client";

import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useState, type FormEvent } from "react";
import { Search } from "lucide-react";

export default function SearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q");
  const [query, setQuery] = useState(initialQuery || "");
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/spotify/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-5 w-5 text-card-foreground" />
        </div>
        <input
          type="search"
          className="block w-full p-3 pl-10 text-sm bg-card hover:bg-accent border-none rounded-full focus:ring-2 focus:ring-muted-foreground/50 focus:outline-none text-foreground placeholder-muted-foreground"
          placeholder="What do you want to listen to?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
    </form>
  );
}
