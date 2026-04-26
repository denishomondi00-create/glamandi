import Link from "next/link";

export function InquiryCta() {
  return (
    <div className="rounded-[2rem] border border-[#C5F0F8] bg-white p-6 shadow-xl shadow-[#145F6B]/5">
      <h2 className="text-2xl font-black text-[#145F6B]">Need a unit or property support?</h2>
      <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">Send an inquiry and the Glamandi team can follow up through the Control Center CRM.</p>
      <Link href="/contact" className="mt-5 inline-flex rounded-2xl bg-[#145F6B] px-5 py-3 text-sm font-black text-white">Contact Glamandi</Link>
    </div>
  );
}
