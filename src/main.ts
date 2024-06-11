import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigurationService } from './config/configuration.service';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Environments } from './config/enums';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { environment, host, swagger, port }: ConfigurationService =
    app.get(ConfigurationService);

  if (environment !== Environments.PRODUCTION) {
    const config = new DocumentBuilder()
      .setTitle('UhoMuho')
      .setDescription('REST API for UhoMuho app')
      .setVersion('1.0')
      .addBearerAuth()
      .setExternalDoc('Postman Collection', `${host}/${swagger.path}-json`)
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(swagger.path, app, document, {
      swaggerOptions: swagger.options,
    });
  }
  await app
    .listen(port)
    .then(() => Logger.log(`Service started on http port ${port}`));
}
bootstrap();
