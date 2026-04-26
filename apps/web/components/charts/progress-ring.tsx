export function ProgressRing({ value, label }: { value: number; label: string }) {
  const safe = Math.max(0, Math.min(100, value));
  return (
    <div className="flex items-center gap-4 rounded-[1.4rem] border border-[#C5F0F8] bg-white p-4">
      <div className="grid h-20 w-20 place-items-center rounded-full" style={{ background: `conic-gradient(#17DEFE ${safe * 3.6}deg, #E6F8FC 0deg)` }}>
        <div className="grid h-14 w-14 place-items-center rounded-full bg-white text-sm font-black text-[#145F6B]">{safe}%</div>
      </div>
      <p className="font-black text-[#145F6B]">{label}</p>
    </div>
  );
}
