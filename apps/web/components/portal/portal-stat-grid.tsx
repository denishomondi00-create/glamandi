import { MetricGrid } from "@/components/layout/metric-grid";
import type { MetricCardProps } from "@/components/cards/metric-card";

export function PortalStatGrid({ items }: { items: MetricCardProps[] }) {
  return <MetricGrid items={items} />;
}
