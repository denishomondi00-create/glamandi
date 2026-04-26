import { Connection } from 'mongoose';

export const MONGO_CONNECTION = 'MONGO_CONNECTION';

export const mongoProviders = [
  {
    provide: MONGO_CONNECTION,
    useFactory: (connection: Connection) => connection,
    inject: ['DatabaseConnection'],
  },
];
