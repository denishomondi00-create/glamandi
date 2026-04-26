import { Section } from "@/components/layout/section";
import { OutboxTable } from "@/components/offline/outbox-table";
import { ConflictResolutionPanel } from "@/components/offline/conflict-resolution-panel";

export function OfflineSyncDashboard() {
  return (
    <div className="grid gap-6">
      <Section title="Offline outbox" description="Draft mutations waiting for server sync."><OutboxTable /></Section>
      <Section title="Sync conflicts" description="Financial conflicts must be resolved manually."><ConflictResolutionPanel /></Section>
    </div>
  );
}
