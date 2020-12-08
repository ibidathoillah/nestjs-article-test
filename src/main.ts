import { NestFactory } from '@nestjs/core';
import { HttpAdapterHost } from '@nestjs/core/helpers/http-adapter-host';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './config/handler.exception';
import { SeederSevice } from './databases/seeder/seeder.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionsFilter());
  app.setGlobalPrefix('api/v1');
  app.get(SeederSevice);

  await app.listen(3000);
}
bootstrap();
