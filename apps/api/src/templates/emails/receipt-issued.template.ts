export function receiptIssuedEmail(input: { tenantName: string; receiptNumber: string; amount: number }) {
  return {
    subject: `Receipt ${input.receiptNumber} issued`,
    html: `<p>Hello ${input.tenantName}, your receipt of KES ${input.amount} has been issued.</p>`,
  };
}
