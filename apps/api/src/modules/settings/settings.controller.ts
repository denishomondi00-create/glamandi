import { Body, Controller, Get, Patch } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { UpdateSettingDto } from './dto/update-setting.dto';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settings: SettingsService) {}

  @Get() all() { return this.settings.all(); }
  @Patch() patch(@Body() dto: UpdateSettingDto) { return this.settings.patchGroup('general', dto); }

  @Get('business-rules') businessRules() { return this.settings.getGroup('business-rules'); }
  @Patch('business-rules') patchBusinessRules(@Body() dto: UpdateSettingDto) { return this.settings.patchGroup('business-rules', dto); }

  @Get('penalty-rules') penaltyRules() { return this.settings.getGroup('penalty-rules'); }
  @Patch('penalty-rules') patchPenaltyRules(@Body() dto: UpdateSettingDto) { return this.settings.patchGroup('penalty-rules', dto); }

  @Get('commission-rules') commissionRules() { return this.settings.getGroup('commission-rules'); }
  @Patch('commission-rules') patchCommissionRules(@Body() dto: UpdateSettingDto) { return this.settings.patchGroup('commission-rules', dto); }

  @Get('deposit-rules') depositRules() { return this.settings.getGroup('deposit-rules'); }
  @Patch('deposit-rules') patchDepositRules(@Body() dto: UpdateSettingDto) { return this.settings.patchGroup('deposit-rules', dto); }

  @Get('payment-methods') paymentMethods() { return this.settings.getGroup('payment-methods'); }
  @Patch('payment-methods') patchPaymentMethods(@Body() dto: UpdateSettingDto) { return this.settings.patchGroup('payment-methods', dto); }

  @Get('offline-rules') offlineRules() { return this.settings.getGroup('offline-rules'); }
  @Patch('offline-rules') patchOfflineRules(@Body() dto: UpdateSettingDto) { return this.settings.patchGroup('offline-rules', dto); }

  @Get('notification-rules') notificationRules() { return this.settings.getGroup('notification-rules'); }
  @Patch('notification-rules') patchNotificationRules(@Body() dto: UpdateSettingDto) { return this.settings.patchGroup('notification-rules', dto); }

  @Get('website-rules') websiteRules() { return this.settings.getGroup('website-rules'); }
  @Patch('website-rules') patchWebsiteRules(@Body() dto: UpdateSettingDto) { return this.settings.patchGroup('website-rules', dto); }
}
