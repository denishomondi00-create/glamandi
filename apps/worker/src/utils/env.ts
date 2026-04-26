export function env(name: string, fallback?: string) {
  const value = process.env[name] ?? fallback;
  if (value === undefined) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

export function envNumber(name: string, fallback: number) {
  const raw = process.env[name];
  return raw ? Number(raw) : fallback;
}
