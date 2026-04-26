export function receiptPdfTemplate(input: { receiptNumber: string; amount: number; tenantName?: string }) {
  return `<html><body><h1>Glamandi Homes Receipt</h1><p>Receipt: ${input.receiptNumber}</p><p>Tenant: ${input.tenantName ?? ''}</p><p>Amount: KES ${input.amount}</p></body></html>`;
}
