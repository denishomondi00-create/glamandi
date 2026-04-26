import { MetricCard, type MetricCardProps } from "@/components/cards/metric-card";

export function MetricGrid({ items }: { items: MetricCardProps[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => <MetricCard key={item.label} {...item} />)}
    </div>
  );
}
