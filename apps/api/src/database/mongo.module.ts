import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('db.uri'),
        dbName: config.get<string>('db.name'),
        autoIndex: config.get<string>('app.environment') !== 'production',
      }),
    }),
  ],
  exports: [MongooseModule],
})
export class MongoModule {}
