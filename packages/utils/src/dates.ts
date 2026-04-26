export function toISODate(date = new Date()) {
  return date.toISOString();
}

export function monthKey(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

export function isAfterRentDueDay(date = new Date(), dueDay = 5) {
  return date.getDate() > dueDay;
}
