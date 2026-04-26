import { serverApi } from "@/lib/api-client/server-fetcher";
import type { PortalPageData } from "@/components/portal/portal-page";

type PaginatedResult = { items: Record<string, unknown>[]; meta: { total: number } };

function fmtKES(n: unknown) { return `KES ${Number(n ?? 0).toLocaleString("en-KE")}`; }
function fmtDate(v: unknown) {
  if (!v) return "—";
  return new Date(String(v)).toLocaleDateString("en-KE", { day: "2-digit", month: "short", year: "numeric" });
}

async function safeFetch<T>(path: string): Promise<T | null> {
  try { return await serverApi.get<T>(path, { cache: "no-store" }); } catch { return null; }
}

const sectionMeta: Record<string, {
  title: string;
  description: string;
  apiPath: string;
  columns: Array<{ key: string; label: string }>;
  isSingle?: boolean;
}> = {
  dashboard: {
    title: "My Dashboard",
    description: "Rent balance, receipts, penalties, utilities, repair requests, and notices in one tenant-facing source of truth.",
    apiPath: "/charges",
    columns: [{ key: "type", label: "Type" }, { key: "amount", label: "Amount" }, { key: "status", label: "Status" }, { key: "dueDate", label: "Due Date" }],
  },
  charges: {
    title: "Charges",
    description: "Rent, utilities, penalties, and other charges on your account.",
    apiPath: "/charges",
    columns: [{ key: "type", label: "Type" }, { key: "period", label: "Period" }, { key: "amount", label: "Amount (KES)" }, { key: "balance", label: "Balance (KES)" }, { key: "status", label: "Status" }, { key: "dueDate", label: "Due" }],
  },
  payments: {
    title: "Payments",
    description: "Payments posted across all channels — M-Pesa, KCB, cash, and online.",
    apiPath: "/payments",
    columns: [{ key: "reference", label: "Reference" }, { key: "method", label: "Method" }, { key: "amount", label: "Amount (KES)" }, { key: "status", label: "Status" }, { key: "paidAt", label: "Date" }],
  },
  receipts: {
    title: "Receipts",
    description: "Official receipts generated after verified payment posting.",
    apiPath: "/receipts",
    columns: [{ key: "receiptNumber", label: "Receipt #" }, { key: "amount", label: "Amount (KES)" }, { key: "status", label: "Status" }, { key: "issuedAt", label: "Date" }],
  },
  penalties: {
    title: "Penalties",
    description: "Late payment penalties, waiver status, and exception notes.",
    apiPath: "/penalties",
    columns: [{ key: "amount", label: "Amount (KES)" }, { key: "band", label: "Band" }, { key: "status", label: "Status" }, { key: "reason", label: "Reason" }],
  },
  deposit: {
    title: "Deposit",
    description: "Security deposit ledger — collections, approved deductions, and refund eligibility.",
    apiPath: "/deposits",
    columns: [{ key: "type", label: "Type" }, { key: "amount", label: "Amount (KES)" }, { key: "status", label: "Status" }, { key: "created_at", label: "Date" }],
  },
  utilities: {
    title: "Utilities",
    description: "Water, electricity, and other utility charges and billing periods.",
    apiPath: "/utilities",
    columns: [{ key: "type", label: "Utility" }, { key: "period", label: "Period" }, { key: "units", label: "Units" }, { key: "amount", label: "Amount (KES)" }, { key: "status", label: "Status" }],
  },
  repairs: {
    title: "Repair Requests",
    description: "Maintenance and repair tickets you have raised — status and progress updates.",
    apiPath: "/repairs",
    columns: [{ key: "title", label: "Issue" }, { key: "status", label: "Status" }, { key: "priority", label: "Priority" }, { key: "created_at", label: "Raised" }],
  },
  notices: {
    title: "Notices",
    description: "Official notices, rent reminders, and operational announcements from Glamandi.",
    apiPath: "/notifications",
    columns: [{ key: "type", label: "Type" }, { key: "subject", label: "Subject" }, { key: "status", label: "Status" }, { key: "created_at", label: "Date" }],
  },
  profile: {
    title: "My Profile",
    description: "Your contact details, notification preferences, and account settings.",
    apiPath: "/auth/me",
    columns: [{ key: "name", label: "Name" }, { key: "email", label: "Email" }, { key: "role", label: "Role" }],
    isSingle: true,
  },
  unit: {
    title: "My Unit",
    description: "Unit details, property information, and location snapshot visible to you as the tenant.",
    apiPath: "/tenancies",
    columns: [{ key: "status", label: "Status" }, { key: "rentAmount", label: "Rent (KES)" }, { key: "startDate", label: "Move In" }, { key: "billingDay", label: "Billing Day" }],
  },
};

export async function getTenantPortalSection(section: string): Promise<PortalPageData> {
  const meta = sectionMeta[section] ?? sectionMeta.dashboard;

  let items: Record<string, unknown>[] = [];
  let total = 0;

  if (meta.isSingle) {
    const user = await safeFetch<Record<string, unknown>>(meta.apiPath);
    if (user) { items = [user]; total = 1; }
  } else {
    const res = await safeFetch<PaginatedResult>(meta.apiPath);
    items = res?.items ?? [];
    total = res?.meta?.total ?? 0;
  }

  const rows = items.slice(0, 10).map((item) => {
    const row: Record<string, string> = { id: String(item._id ?? Math.random()) };
    meta.columns.forEach(({ key, label }) => {
      let v: unknown = item[key];
      if (typeof v === "string" && /^\d{4}-\d{2}-\d{2}T/.test(v)) v = fmtDate(v);
      if ((key === "amount" || key === "balance" || key === "rentAmount") && typeof v === "number") v = fmtKES(v);
      row[label] = v != null ? String(v) : "—";
    });
    return row;
  });

  const metrics = [
    { label: "Total", value: String(total), helper: `${meta.title} records`, tone: "teal" as const },
    { label: "Showing", value: String(items.length), helper: "Current page" },
    { label: "Source", value: "Live API", helper: meta.apiPath },
    { label: "Updated", value: new Date().toLocaleDateString("en-KE"), helper: "Fetched now" },
  ];

  const sectionPanels: Record<string, { title: string; description: string; items: string[] }[]> = {
    payments: [
      { title: "Payment channels", description: "Glamandi accepts multiple payment methods.", items: ["M-Pesa STK Push", "Manual M-Pesa reference", "KCB bank transfer", "Cash at office"] },
      { title: "After payment", description: "Once your payment is verified an official receipt is generated.", items: ["Receipt sent by SMS/email", "Viewable under Receipts", "Dispute within 7 days"] },
    ],
    charges: [
      { title: "Charge types", description: "Your account may include several charge categories.", items: ["Monthly rent", "Utility charges", "Penalty fees", "One-time charges"] },
    ],
    deposit: [
      { title: "Deposit policy", description: "Security deposit is held against damages and unpaid rent.", items: ["Refundable on valid exit", "Deductions require approval", "Exit inspection required"] },
    ],
  };

  const panels = sectionPanels[section] ?? [
    { title: "Payment rule", description: "Official receipt numbers are generated only after server-verified payment posting.", items: ["M-Pesa", "KCB", "Cash", "Paystack"] },
    { title: "Deposit rule", description: "Deposit refunds require valid notice and an exit review with Glamandi staff.", items: ["One month notice", "Exit inspection", "Deductions need approval"] },
  ];

  const primaryAction = section === "payments" || section === "dashboard"
    ? { href: "/tenant/payments/new", label: "Make Payment" }
    : undefined;

  return {
    eyebrow: "Tenant Portal",
    title: meta.title,
    description: meta.description,
    metrics,
    panels,
    rows,
    columns: meta.columns.map(({ label }) => ({ key: label, header: label })),
    primaryAction,
  };
}
