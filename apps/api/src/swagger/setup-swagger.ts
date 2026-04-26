import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication, config: ConfigService) {
  if (config.get<boolean>('swagger.enabled') === false) return;

  const documentConfig = new DocumentBuilder()
    .setTitle(config.get<string>('swagger.title') ?? 'Glamandi PMOS API')
    .setDescription(config.get<string>('swagger.description') ?? 'Glamandi Control Center API')
    .setVersion(config.get<string>('swagger.version') ?? '1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, documentConfig);
  SwaggerModule.setup(config.get<string>('swagger.path') ?? 'docs', app, document);
}
