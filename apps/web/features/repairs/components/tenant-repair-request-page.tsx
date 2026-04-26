"use client";

import { FormField } from "@/components/forms/form-field";
import { TextareaField } from "@/components/forms/textarea-field";
import { Alert } from "@/components/feedback/alert";
import { PageHeader } from "@/components/layout/page-header";
import { addOfflineMutation } from "@/lib/offline/outbox";
import type { TenantRepairRequestContext } from "../server/get-tenant-repair-request-context";

export function TenantRepairRequestPage({ context }: { context: TenantRepairRequestContext }) {
  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    await addOfflineMutation({
      operation: "CREATE_REPAIR_TICKET",
      entityType: "repair_ticket",
      payload: {
        unitLabel: context.unitLabel,
        category: form.get("category"),
        title: form.get("title"),
        description: form.get("description"),
      },
    });
    event.currentTarget.reset();
    alert("Repair request saved to outbox. It will sync when online.");
  }

  return (
    <div>
      <PageHeader eyebrow="Tenant Portal" title="New Repair Request" description="Log a repair request. Offline drafts sync into the server when connection returns." />
      <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
        <form onSubmit={onSubmit} className="glamandi-card grid gap-4 rounded-[2rem] p-6">
          <FormField name="title" label="Issue title" placeholder="Example: Kitchen tap leaking" required />
          <label className="grid gap-2">
            <span className="text-sm font-black text-[#145F6B]">Category</span>
            <select name="category" className="rounded-2xl border border-[#C5F0F8] bg-white px-4 py-3 text-sm font-semibold outline-none focus:ring-4 focus:ring-[#17DEFE]/20">
              {context.categories.map((category) => <option key={category}>{category}</option>)}
            </select>
          </label>
          <TextareaField name="description" label="Description" placeholder="Describe the repair issue, urgency, and access notes." required />
          <button className="rounded-2xl bg-[#145F6B] px-5 py-3 text-sm font-black text-white">Save repair request</button>
        </form>
        <Alert title="Offline supported">{context.notice}</Alert>
      </div>
    </div>
  );
}
