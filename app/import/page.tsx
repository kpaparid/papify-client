import Importer, { SearchResult2 } from "@/features/importer";

export default async function Page({ searchParams }: { searchParams: { q: string } }) {
  const q = (await searchParams).q || "";
  // console.log(q);
  const fetchData = () =>
    new Promise<SearchResult2[]>((resolve) =>
      setTimeout(
        () =>
          resolve([
            {
              id: "1",
              name: "Bohemian Rhapsody",
              artists: ["Queen"],
              album: {
                id: "2",
                name: "A Night at the Opera",
                images: ["https://example.com/queen.jpg"],
                release_date: "1975-10-21",
                total_tracks: 6,
                artists: [{ id: "3", name: "Queen" }],
              },
              isSaved: false,
              popularity: 95,
              score: 0.9,
            },
          ]),
        1000
      )
    );
  // if (q) {
  //   console.log(JSON.parse(q));
  // }

  const searchResults = q ? await fetchData() : [];
  return <Importer searchResults={searchResults} />;
}
