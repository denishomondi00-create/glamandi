import Image from "next/image";

export function LogoMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid h-12 w-12 place-items-center overflow-hidden rounded-2xl border border-[#C5F0F8] bg-white shadow-sm">
        <Image src="/logos/glamandi-logo.jpeg" alt="Glamandi Homes" width={96} height={96} className="h-full w-full object-contain p-1" priority />
      </span>
      {!compact ? (
        <span className="leading-tight">
          <span className="block text-lg font-black text-[#145F6B]">Glamandi Homes</span>
          <span className="block text-xs font-black uppercase tracking-[0.22em] text-[#3AC4FA]">Control Center</span>
        </span>
      ) : null}
    </div>
  );
}
