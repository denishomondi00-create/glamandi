import type { Metadata } from "next";
import { serverApi } from "@/lib/api-client/server-fetcher";
import { Badge, StatCard } from "@/components/glamandi/page-kit";
import Link from "next/link";
export const metadata: Metadata = { title: "Repairs Report | Glamandi Control Center" };
export default async function Page() {
  let data: Record<string, unknown> | null = null;
  try { data = await serverApi.get<Record<string, unknown>>("/reports/repairs", { cache: "no-store" }); } catch {}
  const rows: unknown[] = Array.isArray(data?.rows) ? (data!.rows as unknown[]) : [];
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <section className="relative overflow-hidden rounded-[2rem] border border-[#C5F0F8]/80 bg-white p-6 shadow-xl shadow-[#145F6B]/5 lg:p-8">
        <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-[#17DEFE]/20 blur-3xl" />
        <div className="relative flex flex-wrap items-start justify-between gap-4">
          <div><Badge>Admin / Reports</Badge>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-[#145F6B]">Repairs</h1>
            <p className="mt-3 text-base leading-7 text-slate-600">Generated at: {data?.generatedAt ? new Date(String(data.generatedAt)).toLocaleString("en-KE") : "—"}</p>
          </div>
          <Link href="/admin/reports" className="rounded-2xl border border-[#C5F0F8] bg-white px-5 py-3 text-sm font-black text-[#145F6B] hover:border-[#17DEFE]">← All Reports</Link>
        </div>
      </section>
      <section className="rounded-[2rem] border border-[#C5F0F8]/80 bg-white p-6 shadow-xl shadow-[#145F6B]/5">
        <h2 className="mb-4 text-lg font-black text-[#145F6B]">Report Data — {rows.length} row{rows.length !== 1 ? "s" : ""}</h2>
        {rows.length === 0 ? (
          <p className="text-sm font-semibold text-slate-500">No data yet. Records will appear here once data is available in the system.</p>
        ) : (
          <div className="overflow-hidden rounded-[1.4rem] border border-[#C5F0F8]">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-[#C5F0F8] text-left text-sm">
                <thead className="bg-[#F0FBFF]">
                  <tr>{Object.keys(rows[0] as Record<string, unknown>).map((k) => <th key={k} className="px-4 py-3 text-xs font-black uppercase tracking-[0.18em] text-[#145F6B]">{k}</th>)}</tr>
                </thead>
                <tbody className="divide-y divide-[#C5F0F8]/80">
                  {rows.map((row, i) => (
                    <tr key={i} className="hover:bg-[#F0FBFF]/80">
                      {Object.values(row as Record<string, unknown>).map((v, j) => (
                        <td key={j} className="px-4 py-3 font-semibold text-slate-700">{typeof v === "number" ? v.toLocaleString("en-KE") : String(v ?? "—")}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
