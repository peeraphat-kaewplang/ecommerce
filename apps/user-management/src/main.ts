import { NestFactory } from '@nestjs/core';
import { UserManagementModule } from './user-management.module';
import { ConfigService } from '@nestjs/config';
import { SharedService } from '@app/shared';

async function bootstrap() {
  const app = await NestFactory.create(UserManagementModule);

  const configService = app.get(ConfigService)
  const sharedService = app.get(SharedService)

  const queue = configService.get('RABBITMQ_USER_MANAGEMENT_QUEUE')

  app.connectMicroservice(sharedService.getRmqOptions(queue));
  app.startAllMicroservices();
}
bootstrap();
