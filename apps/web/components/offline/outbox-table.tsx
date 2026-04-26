"use client";

import { useEffect, useState } from "react";
import { getPendingMutations } from "@/lib/offline/outbox";
import { DataTable } from "@/components/tables/data-table";
import type { OfflineMutationEnvelope } from "@/lib/offline/stores";

export function OutboxTable() {
  const [rows, setRows] = useState<OfflineMutationEnvelope[]>([]);

  useEffect(() => {
    getPendingMutations().then(setRows).catch(() => setRows([]));
  }, []);

  return <DataTable rows={rows as unknown as Array<Record<string, unknown>>} columns={[{ key: "operation", header: "Operation" }, { key: "status", header: "Status" }, { key: "createdAt", header: "Created" }]} />;
}
