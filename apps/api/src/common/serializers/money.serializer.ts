import { DEFAULT_CURRENCY } from '../constants/app.constants';

export function serializeMoney(amount: number, currency = DEFAULT_CURRENCY) {
  return { amount, currency, formatted: new Intl.NumberFormat('en-KE', { style: 'currency', currency }).format(amount) };
}
