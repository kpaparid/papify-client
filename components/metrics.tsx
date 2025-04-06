import { ReactNode } from "react";

export interface Metrics {
  value: ReactNode;
  label: ReactNode;
  badge?: ReactNode;
}
export default function Metrics({ metrics }: { metrics: Metrics[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      {metrics.map(({ label, value, badge }, index) => (
        <div
          key={`metric-${index}`}
          className="group relative overflow-hidden rounded-xl bg-card px-8 transition-all hover:shadow-lg border border-border py-10"
        >
          <div className="relative">
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <div className="flex items-center gap-3 pt-1">
              <h2 className="text-4xl font-bold">{value}</h2>
              {badge && (
                <span className="rounded-full bg-[#183D3D] px-2 py-1 text-xs font-medium">
                  {badge}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
