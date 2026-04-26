import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import type { JwtSignOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../database/schemas/user.schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const expiresIn = config.get<string>('auth.accessTtl') ?? '15m';

        return {
          secret: config.get<string>('auth.accessSecret'),
          signOptions: { expiresIn: expiresIn as JwtSignOptions['expiresIn'] },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
