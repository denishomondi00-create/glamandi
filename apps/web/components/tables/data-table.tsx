import { EmptyTable } from "./empty-table";

export type DataTableColumn<T> = {
  key: keyof T | string;
  header: string;
  render?: (row: T) => React.ReactNode;
};

export function DataTable<T extends Record<string, unknown>>({ columns, rows }: { columns: DataTableColumn<T>[]; rows: T[] }) {
  if (!rows.length) return <EmptyTable />;
  return (
    <div className="overflow-hidden rounded-[1.4rem] border border-[#C5F0F8] bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-[#C5F0F8] text-left text-sm">
          <thead className="bg-[#F0FBFF] text-xs font-black uppercase tracking-[0.18em] text-[#145F6B]">
            <tr>{columns.map((column) => <th key={String(column.key)} className="px-4 py-3">{column.header}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-[#C5F0F8]/80">
            {rows.map((row, index) => (
              <tr key={String(row.id ?? index)} className="hover:bg-[#F0FBFF]/80">
                {columns.map((column) => <td key={String(column.key)} className="px-4 py-3 font-semibold text-slate-700">{column.render ? column.render(row) : String(row[column.key] ?? "—")}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
