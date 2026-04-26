import { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from '../constants/app.constants';

export function getPagination(input: { page?: number; limit?: number }) {
  const page = Math.max(Number(input.page ?? 1), 1);
  const limit = Math.min(Math.max(Number(input.limit ?? DEFAULT_PAGE_SIZE), 1), MAX_PAGE_SIZE);
  const skip = (page - 1) * limit;
  return { page, limit, skip };
}

export function buildPaginationMeta(page: number, limit: number, total: number) {
  return { page, limit, total, totalPages: Math.ceil(total / limit) };
}
