import { Section } from "@/components/layout/section";
import { MetricGrid } from "@/components/layout/metric-grid";
import type { AuthSummary } from "../schemas/auth.schema";

export function AuthOverview({ data }: { data: AuthSummary }) {
  const metrics = [
    { label: "Name", value: data.name },
    { label: "Email", value: data.email },
    { label: "Role", value: data.role ?? "—" },
    { label: "Status", value: data.status ?? "—" },
  ];

  return (
    <div className="grid gap-6">
      <Section title="My Account" description="Your session details from the Glamandi API.">
        <MetricGrid items={metrics} />
      </Section>
    </div>
  );
}
