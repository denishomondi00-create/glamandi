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
}> = {
  dashboard: {
    title: "Landlord Command Center",
    description: "Properties, occupancy, statements, repair deductions, documents, and payout history in one landlord view.",
    apiPath: "/landlords",
    columns: [{ key: "firstName", label: "Name" }, { key: "phone", label: "Phone" }, { key: "status", label: "Status" }],
  },
  properties: {
    title: "My Properties",
    description: "Owned properties, listing status, location summaries, and occupancy context.",
    apiPath: "/properties",
    columns: [{ key: "name", label: "Property" }, { key: "managementType", label: "Type" }, { key: "status", label: "Status" }, { key: "listingStatus", label: "Listing" }],
  },
  occupancy: {
    title: "Occupancy",
    description: "Occupied, vacant, reserved, and locked units by property.",
    apiPath: "/units",
    columns: [{ key: "unitLabel", label: "Unit" }, { key: "type", label: "Type" }, { key: "status", label: "Status" }, { key: "rentAmount", label: "Rent (KES)" }],
  },
  statements: {
    title: "Statements",
    description: "Monthly statements with collections, commission, deductions, and net payout.",
    apiPath: "/statements",
    columns: [{ key: "period", label: "Period" }, { key: "grossRent", label: "Gross (KES)" }, { key: "commission", label: "Commission (KES)" }, { key: "netPayout", label: "Net (KES)" }, { key: "status", label: "Status" }],
  },
  payouts: {
    title: "Payouts",
    description: "Payout history, status, references, and reversal visibility.",
    apiPath: "/payouts",
    columns: [{ key: "amount", label: "Amount (KES)" }, { key: "status", label: "Status" }, { key: "method", label: "Method" }, { key: "reference", label: "Reference" }, { key: "created_at", label: "Date" }],
  },
  repairs: {
    title: "Repairs",
    description: "Repair tickets visible to you as the landlord, with deduction decisions.",
    apiPath: "/repairs",
    columns: [{ key: "title", label: "Issue" }, { key: "status", label: "Status" }, { key: "priority", label: "Priority" }, { key: "created_at", label: "Raised" }],
  },
  deductions: {
    title: "Deductions",
    description: "Commission, approved repairs, withdrawals, and statement adjustments.",
    apiPath: "/statements",
    columns: [{ key: "period", label: "Period" }, { key: "commission", label: "Commission (KES)" }, { key: "deductions", label: "Deductions (KES)" }, { key: "netPayout", label: "Net (KES)" }],
  },
  documents: {
    title: "Documents",
    description: "Agreements, statements, proof uploads, and property documents.",
    apiPath: "/documents",
    columns: [{ key: "type", label: "Type" }, { key: "title", label: "Title" }, { key: "status", label: "Status" }, { key: "created_at", label: "Date" }],
  },
  profile: {
    title: "My Profile",
    description: "Landlord contact details, payout preferences, and account records.",
    apiPath: "/auth/me",
    columns: [{ key: "name", label: "Name" }, { key: "email", label: "Email" }, { key: "role", label: "Role" }],
  },
};

export async function getLandlordPortalSection(section: string): Promise<PortalPageData> {
  const meta = sectionMeta[section] ?? sectionMeta.dashboard;

  let items: Record<string, unknown>[] = [];
  let total = 0;

  const res = await safeFetch<PaginatedResult | Record<string, unknown>>(meta.apiPath);
  if (res && "items" in res) {
    items = (res as PaginatedResult).items ?? [];
    total = (res as PaginatedResult).meta?.total ?? 0;
  } else if (res) {
    items = [res as Record<string, unknown>];
    total = 1;
  }

  const rows = items.slice(0, 10).map((item) => {
    const row: Record<string, string> = { id: String(item._id ?? Math.random()) };
    meta.columns.forEach(({ key, label }) => {
      let v: unknown = item[key];
      if (typeof v === "string" && /^\d{4}-\d{2}-\d{2}T/.test(v)) v = fmtDate(v);
      if ((key === "amount" || key === "balance" || key === "rentAmount" || key === "grossRent" || key === "commission" || key === "netPayout" || key === "deductions") && typeof v === "number") v = fmtKES(v);
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

  return {
    eyebrow: "Landlord Portal",
    title: meta.title,
    description: meta.description,
    metrics,
    panels: [
      { title: "Payout formula", description: "Net payout = collected rent − commission − approved repair deductions.", items: ["10% commission rule", "Approved repairs only", "No arbitrary deductions"] },
      { title: "Statement integrity", description: "Statements are generated from canonical posted payments and approved deductions in MongoDB.", items: ["MongoDB source", "PDF on request", "Audit logged"] },
    ],
    rows,
  };
}
