import { NestFactory } from '@nestjs/core';
import { OrderManagementModule } from './order-management.module';
import { ConfigService } from '@nestjs/config';
import { SharedService } from '@app/shared';

async function bootstrap() {
  const app = await NestFactory.create(OrderManagementModule);
  const configService = app.get(ConfigService)
  const sharedService = app.get(SharedService)

  const queue = configService.get('RABBITMQ_ORDER_MANAGEMENT_QUEUE')

  app.connectMicroservice(sharedService.getRmqOptions(queue));
  app.startAllMicroservices();
}
bootstrap();
