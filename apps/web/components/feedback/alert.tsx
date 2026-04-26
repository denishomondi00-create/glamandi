import type { ReactNode } from "react";

export function Alert({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-[1.4rem] border border-[#17DEFE]/40 bg-[#17DEFE]/10 p-4 text-[#145F6B]">
      <p className="font-black">{title}</p>
      <div className="mt-1 text-sm font-semibold leading-6">{children}</div>
    </div>
  );
}
