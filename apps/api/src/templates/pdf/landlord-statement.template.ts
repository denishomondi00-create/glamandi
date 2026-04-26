export function landlordStatementPdfTemplate(input: { landlordName: string; netPayout: number }) {
  return `<html><body><h1>Landlord Statement</h1><p>${input.landlordName}</p><p>Net payout: KES ${input.netPayout}</p></body></html>`;
}
