import { ActionCard } from "@/components/cards/action-card";

export function PortalActionList({ actions }: { actions: Array<{ title: string; description: string; href: string; label: string }> }) {
  return <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{actions.map((action) => <ActionCard key={action.href} {...action} />)}</div>;
}
