import { Controller, Get } from '@nestjs/common';
import { OrderManagementService } from './order-management.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserEntity } from '@app/shared';
import { NewOrderDTO } from './dtos/order.dto';

@Controller()
export class OrderManagementController {
  constructor(
    private readonly orderManagementService: OrderManagementService,
  ) {}
  @MessagePattern({ cmd: 'get-order-all' })
  async getAllOrder() {
    return this.orderManagementService.getAllOrder();
  }

  @MessagePattern({ cmd: 'create-order' })
  async createOrder(
    @Payload() payload: { user: UserEntity; items: NewOrderDTO[] },
  ) {
    return this.orderManagementService.createOrder(payload.user, payload.items);
  }

  @MessagePattern({ cmd: 'order-cancel' })
  async cancelOrder(@Payload() playload: { id: number }) {
    return this.orderManagementService.cancelOrder(playload.id);
  }

  @MessagePattern({ cmd: 'get-order-user' })

  async getOrderByUserId(@Payload() playload: { user : UserEntity }) {
    return this.orderManagementService.getOrderByUserId(playload.user)
  }
}
