import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { RolesGuard } from './common/guards/roles.guard';
import { PermissionsGuard } from './common/guards/permissions.guard';

import appConfig from './config/app.config';
import authConfig from './config/auth.config';
import dbConfig from './config/db.config';
import redisConfig from './config/redis.config';
import storageConfig from './config/storage.config';
import paymentsConfig from './config/payments.config';
import queueConfig from './config/queue.config';
import websiteConfig from './config/website.config';
import notificationsConfig from './config/notifications.config';
import offlineSyncConfig from './config/offline-sync.config';
import swaggerConfig from './config/swagger.config';
import { MongoModule } from './database/mongo.module';
import { QueueModule } from './queue/queue.module';
import { HealthModule } from './modules/health/health.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { RolesModule } from './modules/roles/roles.module';
import { LandlordsModule } from './modules/landlords/landlords.module';
import { PropertiesModule } from './modules/properties/properties.module';
import { UnitsModule } from './modules/units/units.module';
import { TenantsModule } from './modules/tenants/tenants.module';
import { TenanciesModule } from './modules/tenancies/tenancies.module';
import { InquiriesModule } from './modules/inquiries/inquiries.module';
import { ChargesModule } from './modules/charges/charges.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { ReceiptsModule } from './modules/receipts/receipts.module';
import { PenaltiesModule } from './modules/penalties/penalties.module';
import { DepositsModule } from './modules/deposits/deposits.module';
import { UtilitiesModule } from './modules/utilities/utilities.module';
import { RepairsModule } from './modules/repairs/repairs.module';
import { StatementsModule } from './modules/statements/statements.module';
import { PayoutsModule } from './modules/payouts/payouts.module';
import { ReportsModule } from './modules/reports/reports.module';
import { WebsiteModule } from './modules/website/website.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { DocumentsModule } from './modules/documents/documents.module';
import { WebhooksModule } from './modules/webhooks/webhooks.module';
import { AuditModule } from './modules/audit/audit.module';
import { SettingsModule } from './modules/settings/settings.module';
import { SyncModule } from './modules/sync/sync.module';

@Module({
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
    { provide: APP_GUARD, useClass: PermissionsGuard },
  ],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [
        appConfig,
        authConfig,
        dbConfig,
        redisConfig,
        storageConfig,
        paymentsConfig,
        queueConfig,
        websiteConfig,
        notificationsConfig,
        offlineSyncConfig,
        swaggerConfig,
      ],
    }),
    MongoModule,
    QueueModule,
    HealthModule,
    AuthModule,
    UsersModule,
    RolesModule,
    LandlordsModule,
    PropertiesModule,
    UnitsModule,
    TenantsModule,
    TenanciesModule,
    InquiriesModule,
    ChargesModule,
    PaymentsModule,
    ReceiptsModule,
    PenaltiesModule,
    DepositsModule,
    UtilitiesModule,
    RepairsModule,
    StatementsModule,
    PayoutsModule,
    ReportsModule,
    WebsiteModule,
    NotificationsModule,
    DocumentsModule,
    WebhooksModule,
    AuditModule,
    SettingsModule,
    SyncModule,
  ],
})
export class AppModule {}
