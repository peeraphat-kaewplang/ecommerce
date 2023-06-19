import { Module } from '@nestjs/common';
import { OrderManagementController } from './order-management.controller';
import { OrderManagementService } from './order-management.service';
import {
  MysqlDBModule,
  OrderDetailEntity,
  OrderEntity,
  ProductEntity,
  ProfileEntity,
  SharedModule,
  UserEntity,
} from '@app/shared';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    SharedModule,
    MysqlDBModule,
    TypeOrmModule.forFeature([
      UserEntity,
      ProfileEntity,
      OrderEntity,
      OrderDetailEntity,
      ProductEntity,
    ]),
  ],
  controllers: [OrderManagementController],
  providers: [OrderManagementService],
})
export class OrderManagementModule {}
