import { NestFactory } from '@nestjs/core';
import { ProductManagementModule } from './product-management.module';
import { ConfigService } from '@nestjs/config';
import { SharedService } from '@app/shared';

async function bootstrap() {
  const app = await NestFactory.create(ProductManagementModule);
  const configService = app.get(ConfigService)
  const sharedService = app.get(SharedService)

  const queue = configService.get('RABBITMQ_PRODUCT_MANAGEMENT_QUEUE')

  app.connectMicroservice(sharedService.getRmqOptions(queue));
  app.startAllMicroservices();
}
bootstrap();
