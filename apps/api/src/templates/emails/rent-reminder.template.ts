export function rentReminderEmail(input: { tenantName: string; amount: number; dueDate: string }) {
  return {
    subject: 'Rent reminder from Glamandi Homes',
    html: `<p>Hello ${input.tenantName},</p><p>Your rent balance is KES ${input.amount}. Due date: ${input.dueDate}.</p>`,
  };
}
