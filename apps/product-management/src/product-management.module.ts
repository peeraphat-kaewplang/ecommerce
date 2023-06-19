import { Module } from '@nestjs/common';
import { ProductManagementController } from './product-management.controller';
import { ProductManagementService } from './product-management.service';
import { MysqlDBModule, SharedModule, ProductEntity, UserEntity, ProfileEntity, OrderEntity, OrderDetailEntity } from '@app/shared';
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
      ProductEntity
    ]),
  ],
  controllers: [ProductManagementController],
  providers: [ProductManagementService],
})
export class ProductManagementModule {}
