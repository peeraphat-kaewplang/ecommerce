import { Module } from '@nestjs/common';
import { UserManagementController } from './user-management.controller';
import { UserManagementService } from './user-management.service';
import {
  SharedModule,
  MysqlDBModule,
  UserEntity,
  ProfileEntity,
  OrderEntity,
  OrderDetailEntity,
  ProductEntity,
} from '@app/shared';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    SharedModule,
    SharedModule.registerRmq('AUTH_SERVICE', process.env.RABBITMQ_AUTH_QUEUE),
    SharedModule.registerRmq(
      'ORDER_MANAGEMENT_SERVICE',
      process.env.RABBITMQ_ORDER_MANAGEMENT_QUEUE,
    ),
    MysqlDBModule,
    TypeOrmModule.forFeature([
      UserEntity,
      ProfileEntity,
      OrderEntity,
      OrderDetailEntity,
      ProductEntity,
    ]),
  ],
  controllers: [UserManagementController],
  providers: [UserManagementService],
})
export class UserManagementModule {}
