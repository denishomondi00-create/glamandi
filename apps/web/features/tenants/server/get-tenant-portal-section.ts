import type { PortalPageData } from "@/components/portal/portal-page";

const tenantSections: Record<string, PortalPageData> = {
  dashboard: {
    eyebrow: "Tenant Portal",
    title: "Tenant Command Center",
    description: "Rent balance, receipts, penalties, utilities, notices, and repair requests in one tenant-facing source of truth.",
    metrics: [
      { label: "Balance", value: "KES 0", helper: "Server-calculated", tone: "teal" },
      { label: "Receipts", value: "0", helper: "Official only" },
      { label: "Penalties", value: "0", helper: "After due rules" },
      { label: "Open repairs", value: "0", helper: "Tenant requests" },
    ],
    panels: [
      { title: "Payment rule", description: "Manual payments can be drafted offline, but official receipt numbers are generated only after server posting.", items: ["Manual M-Pesa draft", "KCB draft", "Cash draft", "Paystack online only"] },
      { title: "Deposit rule", description: "Deposit is not rent. Refund requires valid notice and exit review.", items: ["One month notice", "1st to 5th preferred", "Deductions require approval"] },
    ],
    rows: [
      { id: "tenant-1", name: "Current tenancy", status: "Active", updated: "Today" },
      { id: "tenant-2", name: "Latest payment", status: "Awaiting API", updated: "Today" },
    ],
  },
};

const sectionCopy: Record<string, Partial<PortalPageData>> = {
  unit: { title: "My Unit", description: "Unit details, property location snapshot, and safe access notes visible to the tenant." },
  charges: { title: "Charges", description: "Rent, utilities, penalties, move-in charges, and outstanding balances." },
  payments: { title: "Payments", description: "Payments across manual channels and online gateways after server verification." },
  receipts: { title: "Receipts", description: "Download official receipts created by server-side payment posting." },
  penalties: { title: "Penalties", description: "Late rent penalty status, waiver decisions, and exception notes." },
  deposit: { title: "Deposit", description: "Deposit ledger, refund eligibility, notice status, and approved deductions." },
  utilities: { title: "Utilities", description: "Utility charges, billing periods, and payment status." },
  repairs: { title: "Repairs", description: "Repair tickets, status updates, completion notes, and new request action." },
  notices: { title: "Notices", description: "Official notices, rent reminders, and operational announcements." },
  profile: { title: "My Profile", description: "Contact details, notification preferences, and account information." },
};

export async function getTenantPortalSection(section: string): Promise<PortalPageData> {
  const base = tenantSections.dashboard;
  const override = sectionCopy[section] ?? {};
  return {
    ...base,
    ...override,
    eyebrow: "Tenant Portal",
    metrics: section === "dashboard" ? base.metrics : [
      { label: "Records", value: "0", helper: "Connect endpoint" },
      { label: "Pending", value: "0", helper: "Requires review" },
      { label: "Offline drafts", value: "0", helper: "IndexedDB outbox" },
      { label: "Updated", value: "Today", helper: "Role scoped" },
    ],
    rows: [
      { id: `${section}-1`, name: `${override.title ?? "Tenant"} record`, status: "API pending", updated: "Today" },
      { id: `${section}-2`, name: "Role scoped data", status: "Tenant only", updated: "After sync" },
    ],
  };
}
