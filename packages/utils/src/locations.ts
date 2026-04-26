export function publicLocationLabel(parts: { area?: string; town?: string; county?: string }) {
  return [parts.area, parts.town, parts.county].filter(Boolean).join(', ');
}
