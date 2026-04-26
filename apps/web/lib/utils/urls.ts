export function joinUrl(base: string, path: string) {
  return `${base.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}

export function buildPublicListingUrl(slug: string) {
  return `/properties/${slug}`;
}

export function buildUnitUrl(slug: string) {
  return `/units/${slug}`;
}
