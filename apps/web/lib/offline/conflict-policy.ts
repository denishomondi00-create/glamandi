export const conflictPolicy = {
  financial: "server_wins_manual_admin_resolution",
  tenantNotes: "merge_allowed",
  repairs: "merge_if_unit_and_tenancy_valid",
  inquiries: "merge_unless_duplicate_phone_and_unit_window",
  settings: "offline_edits_not_allowed",
} as const;
