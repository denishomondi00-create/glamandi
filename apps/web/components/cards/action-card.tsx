import Link from "next/link";

export function ActionCard({ title, description, href, label }: { title: string; description: string; href: string; label: string }) {
  return (
    <Link href={href} className="group block rounded-[1.6rem] border border-[#C5F0F8] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#17DEFE] hover:shadow-xl hover:shadow-[#17DEFE]/10">
      <h3 className="text-lg font-black text-[#145F6B]">{title}</h3>
      <p className="mt-2 text-sm font-medium leading-6 text-slate-600">{description}</p>
      <p className="mt-4 text-sm font-black text-[#3AC4FA] group-hover:text-[#145F6B]">{label} →</p>
    </Link>
  );
}
