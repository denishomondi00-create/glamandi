"use client";

export function SearchFilterBar({ placeholder = "Search records..." }: { placeholder?: string }) {
  return (
    <div className="flex flex-col gap-3 rounded-[1.4rem] border border-[#C5F0F8] bg-white p-3 sm:flex-row">
      <input placeholder={placeholder} className="min-w-0 flex-1 rounded-2xl bg-[#F0FBFF] px-4 py-3 text-sm font-semibold outline-none focus:ring-4 focus:ring-[#17DEFE]/20" />
      <button className="rounded-2xl bg-[#145F6B] px-5 py-3 text-sm font-black text-white">Filter</button>
    </div>
  );
}
