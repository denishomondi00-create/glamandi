import { Body, Controller, Headers, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { Public } from '../../common/decorators/public.decorator';
import { PaystackWebhookService } from './paystack-webhook.service';
import { DarajaWebhookService } from './daraja-webhook.service';

@Controller('webhooks')
export class WebhooksController {
  constructor(private readonly paystack: PaystackWebhookService, private readonly daraja: DarajaWebhookService) {}

  @Public()
  @Post('paystack')
  handlePaystack(@Req() req: Request & { rawBody?: Buffer }, @Body() body: Record<string, unknown>, @Headers('x-paystack-signature') signature?: string) {
    return this.paystack.handle(req.rawBody ?? Buffer.from(JSON.stringify(body)), body, signature);
  }

  @Public()
  @Post('daraja/stk-callback')
  darajaStk(@Body() body: Record<string, unknown>) { return this.daraja.handle('stk-callback', body); }

  @Public()
  @Post('daraja/result')
  darajaResult(@Body() body: Record<string, unknown>) { return this.daraja.handle('result', body); }

  @Public()
  @Post('daraja/timeout')
  darajaTimeout(@Body() body: Record<string, unknown>) { return this.daraja.handle('timeout', body); }

  @Public()
  @Post('daraja/c2b-validation')
  darajaC2bValidation(@Body() body: Record<string, unknown>) { return this.daraja.handle('c2b-validation', body); }

  @Public()
  @Post('daraja/c2b-confirmation')
  darajaC2bConfirmation(@Body() body: Record<string, unknown>) { return this.daraja.handle('c2b-confirmation', body); }

  @Public()
  @Post('internal/worker-health')
  workerHealth(@Body() body: Record<string, unknown>) { return { accepted: true, body }; }
}
