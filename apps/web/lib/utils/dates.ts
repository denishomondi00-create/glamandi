export function formatDate(value: string | Date) {
  return new Intl.DateTimeFormat("en-KE", { dateStyle: "medium" }).format(new Date(value));
}

export function toIsoDate(value: Date) {
  return value.toISOString().slice(0, 10);
}
