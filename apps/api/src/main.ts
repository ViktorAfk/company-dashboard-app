import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AppConfigService } from './config/app-config.service';
import { PrismaClientExceptionFilter } from './prisma-client-exception/prisma-client-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig = app.get<AppConfigService>(AppConfigService);
  const allowedOrigins = [appConfig.webUrl];
  const isDevelopment = appConfig.env === 'development';

  if (isDevelopment) {
    allowedOrigins.push('http://localhost:5173');
  }

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const config = new DocumentBuilder()
    .setTitle('Company dashboard API')
    .setDescription('The Company dashboard API description')
    .setVersion('0.1')
    .addBearerAuth()
    .build();

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  app.enableCors({
    credentials: true,
    origin: allowedOrigins,
  });

  await app.listen(appConfig.port);
}
bootstrap();
