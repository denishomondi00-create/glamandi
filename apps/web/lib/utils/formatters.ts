export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function titleCase(value: string) {
  return value.replace(/[-_]/g, " ").replace(/\w/g, (char) => char.toUpperCase());
}
