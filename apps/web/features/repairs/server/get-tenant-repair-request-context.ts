export type TenantRepairRequestContext = {
  unitLabel: string;
  canDraftOffline: boolean;
  categories: string[];
  notice: string;
};

export async function getTenantRepairRequestContext(): Promise<TenantRepairRequestContext> {
  return {
    unitLabel: "Current tenant unit",
    canDraftOffline: true,
    categories: ["Plumbing", "Electrical", "Doors & locks", "Painting", "Appliance", "Other"],
    notice: "Repair tickets can be drafted offline. Server sync confirms the official record when internet returns.",
  };
}
