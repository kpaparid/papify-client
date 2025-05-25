import { fetchGoogleStorage } from "../api";

export default async function GoogleStorage() {
  const googleStorage = await fetchGoogleStorage();
  return (
    <div className="absolute bottom-0 left-0 right-0 p-4">
      <div className="rounded-xl bg-card border border-border">
        <p className="text-xs text-accent-foreground/50 mb-2 font-semibold">Storage</p>
        <div className="h-2 w-full rounded-full bg-accent/50 overflow-hidden">
          <div
            className="h-full rounded-full bg-accent-foreground"
            style={{ width: (googleStorage.usedStorageBytes / googleStorage.totalStorageBytes) * 100 + "%" }}
          ></div>
        </div>
        <div className="mt-2 flex justify-between text-xs text-accent-foreground/50">
          <span>{(googleStorage.usedStorageBytes / (1024 * 1024 * 1024)).toFixed(2)} GB used</span>
          <span>{(googleStorage.totalStorageBytes / (1024 * 1024 * 1024)).toFixed(2)} GB total</span>
        </div>
      </div>
    </div>
  );
}
