export function LoadingState({ title = "Loading", description = "Please wait." }: { title?: string; description?: string }) {
  return (
    <main className="grid min-h-[70vh] place-items-center p-6">
      <div className="rounded-[2rem] border border-[#C5F0F8] bg-white p-8 text-center shadow-xl shadow-[#145F6B]/5">
        <div className="mx-auto mb-5 h-12 w-12 animate-spin rounded-full border-4 border-[#C5F0F8] border-t-[#17DEFE]" />
        <h1 className="text-xl font-black text-[#145F6B]">{title}</h1>
        <p className="mt-2 text-sm font-semibold text-slate-500">{description}</p>
      </div>
    </main>
  );
}
