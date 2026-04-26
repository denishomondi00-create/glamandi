import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Setting, SettingSchema } from '../../database/schemas/setting.schema';
import { PaymentMethod, PaymentMethodSchema } from '../../database/schemas/payment-method.schema';
import { CommissionRule, CommissionRuleSchema } from '../../database/schemas/commission-rule.schema';
import { PenaltyRule, PenaltyRuleSchema } from '../../database/schemas/penalty-rule.schema';
import { DepositRule, DepositRuleSchema } from '../../database/schemas/deposit-rule.schema';
import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Setting.name, schema: SettingSchema },
    { name: PaymentMethod.name, schema: PaymentMethodSchema },
    { name: CommissionRule.name, schema: CommissionRuleSchema },
    { name: PenaltyRule.name, schema: PenaltyRuleSchema },
    { name: DepositRule.name, schema: DepositRuleSchema },
  ])],
  controllers: [SettingsController],
  providers: [SettingsService],
  exports: [SettingsService],
})
export class SettingsModule {}
