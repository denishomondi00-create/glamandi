import { Connection } from 'mongoose';

export async function createIndexes(connection: Connection) {
  await Promise.all([
    connection.collection('payments').createIndex({ reference: 1 }, { unique: true, sparse: true }),
    connection.collection('paymentintents').createIndex({ reference: 1 }, { unique: true, sparse: true }),
    connection.collection('receipts').createIndex({ receiptNumber: 1 }, { unique: true, sparse: true }),
    connection.collection('units').createIndex({ propertyId: 1, unitLabel: 1 }),
    connection.collection('charges').createIndex({ tenantId: 1, period: 1, type: 1 }),
    connection.collection('webhookevents').createIndex({ provider: 1, eventId: 1 }, { unique: true, sparse: true }),
    connection.collection('syncconflicts').createIndex({ status: 1, created_at: -1 }),
    connection.collection('auditlogs').createIndex({ entityType: 1, entityId: 1, created_at: -1 }),
  ]);
}
