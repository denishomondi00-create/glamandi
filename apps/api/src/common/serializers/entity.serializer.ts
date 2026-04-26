export function serializeEntity<T extends Record<string, unknown>>(entity: T | null | undefined) {
  if (!entity) return entity;
  const { __v, passwordHash, ...safe } = entity as T & { __v?: number; passwordHash?: string };
  return safe;
}
