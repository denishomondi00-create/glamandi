export const UNIT_STATUSES = {
  vacant: 'vacant',
  occupied: 'occupied',
  reserved: 'reserved',
  maintenance: 'maintenance',
  locked: 'locked',
} as const;
export type UnitStatus = (typeof UNIT_STATUSES)[keyof typeof UNIT_STATUSES];
