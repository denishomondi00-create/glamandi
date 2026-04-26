"use client";

export function ErrorState({ title, description, actionLabel, onAction }: { title: string; description?: string; actionLabel?: string; onAction?: () => void }) {
  return (
    <main className="grid min-h-[70vh] place-items-center p-6">
      <div className="max-w-lg rounded-[2rem] border border-red-200 bg-white p-8 text-center shadow-xl shadow-red-100">
        <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-3xl bg-red-50 text-2xl">!</div>
        <h1 className="text-2xl font-black text-red-700">{title}</h1>
        {description ? <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">{description}</p> : null}
        {onAction && actionLabel ? <button onClick={onAction} className="mt-6 rounded-2xl bg-red-600 px-5 py-3 text-sm font-black text-white">{actionLabel}</button> : null}
      </div>
    </main>
  );
}
