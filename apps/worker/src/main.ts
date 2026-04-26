import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { WorkerModule } from './worker.module';
import { registerWorkers } from './bootstrap/register-workers';
import { registerSchedulers } from './bootstrap/register-schedulers';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(WorkerModule, { bufferLogs: true });
  const workers = registerWorkers(app);
  const schedulerQueues = await registerSchedulers();

  console.log(`[worker] Glamandi workers started: ${workers.length} processors registered.`);

  async function shutdown(signal: string) {
    console.log(`[worker] ${signal} received. Closing workers and schedulers...`);
    await Promise.all(workers.map((worker) => worker.close()));
    await Promise.all(schedulerQueues.map((queue) => queue.close()));
    await app.close();
    process.exit(0);
  }

  process.on('SIGTERM', () => void shutdown('SIGTERM'));
  process.on('SIGINT', () => void shutdown('SIGINT'));
}

bootstrap().catch((error) => {
  console.error('[worker] Failed to boot Glamandi worker app', error);
  process.exit(1);
});
