import { Module } from '@nestjs/common';
import { KcbClient } from './kcb.client';

@Module({ providers: [KcbClient], exports: [KcbClient] })
export class KcbModule {}
