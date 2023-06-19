import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SharedModule } from '@app/shared';
@Module({
  imports: [
    SharedModule.registerRmq('AUTH_SERVICE', process.env.RABBITMQ_AUTH_QUEUE),
    SharedModule.registerRmq('USER_MANAGEMENT_SERVICE', process.env.RABBITMQ_USER_MANAGEMENT_QUEUE),
    SharedModule.registerRmq('PRODUCT_MANAGEMENT_SERVICE', process.env.RABBITMQ_PRODUCT_MANAGEMENT_QUEUE),
    SharedModule.registerRmq('ORDER_MANAGEMENT_SERVICE', process.env.RABBITMQ_ORDER_MANAGEMENT_QUEUE),
  ],
  controllers: [AppController],
})
export class AppModule {}
