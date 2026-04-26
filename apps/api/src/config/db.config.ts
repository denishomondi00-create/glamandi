import { registerAs } from '@nestjs/config';

export default registerAs('db', () => ({
  uri: process.env.MONGO_URI ?? 'mongodb://localhost:27017/glamandi',
  name: process.env.MONGO_DB_NAME ?? 'glamandi',
  debug: process.env.MONGO_DEBUG === 'true',
}));
