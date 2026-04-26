"use client";

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function SimpleBarChart({ data, dataKey = "value", nameKey = "name" }: { data: Array<Record<string, string | number>>; dataKey?: string; nameKey?: string }) {
  return (
    <div className="h-72 rounded-[1.4rem] border border-[#C5F0F8] bg-white p-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey={nameKey} tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} />
          <Tooltip />
          <Bar dataKey={dataKey} fill="#17DEFE" radius={[12, 12, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
