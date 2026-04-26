import type { PortalPageData } from "@/components/portal/portal-page";

const base: PortalPageData = {
  eyebrow: "Landlord Portal",
  title: "Landlord Command Center",
  description: "Properties, occupancy, statements, repair deductions, documents, and payout history in one landlord view.",
  metrics: [
    { label: "Properties", value: "0", helper: "Owned records", tone: "teal" },
    { label: "Occupancy", value: "0%", helper: "By owned units" },
    { label: "Payout due", value: "KES 0", helper: "Net of deductions" },
    { label: "Statements", value: "0", helper: "Monthly" },
  ],
  panels: [
    { title: "Payout formula", description: "Net payout equals collected rent minus commission, approved repair deductions, and landlord withdrawals.", items: ["10% commission rule", "Approved repairs only", "No hardcoded deductions"] },
    { title: "Statement integrity", description: "Statements must be generated from canonical posted payments and approved deductions.", items: ["MongoDB source of truth", "PDF queued", "Audit logged"] },
  ],
  rows: [
    { id: "landlord-1", name: "Latest statement", status: "Pending generation", updated: "Today" },
    { id: "landlord-2", name: "Payout history", status: "API pending", updated: "Today" },
  ],
};

const copy: Record<string, Partial<PortalPageData>> = {
  properties: { title: "Properties", description: "Owned properties, listing status, location summaries, and occupancy context." },
  occupancy: { title: "Occupancy", description: "Occupied, vacant, reserved, locked, and maintenance units by property." },
  statements: { title: "Statements", description: "Monthly statements with collections, commission, deductions, withdrawals, and net payout." },
  "statement-detail": { title: "Statement Detail", description: "Line-by-line statement view for collections, deductions, documents, and payout references." },
  payouts: { title: "Payouts", description: "Payout status, proof, paid references, and reversal visibility." },
  repairs: { title: "Repairs", description: "Landlord-visible repair tickets and approved deduction decisions." },
  deductions: { title: "Deductions", description: "Commission, approved repairs, withdrawals, and statement adjustments." },
  documents: { title: "Documents", description: "Agreements, statements, proof uploads, and property documents." },
  profile: { title: "Profile", description: "Landlord contact, payout preferences, and account records." },
};

export async function getLandlordPortalSection(section: string): Promise<PortalPageData> {
  const override = copy[section] ?? {};
  return {
    ...base,
    ...override,
    metrics: section === "dashboard" ? base.metrics : [
      { label: "Records", value: "0", helper: "Connect endpoint" },
      { label: "Pending", value: "0", helper: "Needs review" },
      { label: "Amount", value: "KES 0", helper: "Server calculated" },
      { label: "Updated", value: "Today", helper: "Role scoped" },
    ],
    rows: [
      { id: `${section}-1`, name: `${override.title ?? "Landlord"} record`, status: "API pending", updated: "Today" },
      { id: `${section}-2`, name: "Owned property scope", status: "Landlord only", updated: "After sync" },
    ],
  };
}
