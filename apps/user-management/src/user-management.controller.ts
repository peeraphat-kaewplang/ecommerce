import { Controller, Inject } from '@nestjs/common';
import { UserManagementService } from './user-management.service';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { UserEntity } from '@app/shared';

@Controller()
export class UserManagementController {
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly authService: ClientProxy,
    @Inject('ORDER_MANAGEMENT_SERVICE')
    private orderManageService: ClientProxy,
    private readonly userManagementService: UserManagementService,
  ) {}

  @MessagePattern({ cmd: 'get-profile' })
  async getProfile(@Payload() jwt: string) {
    return this.authService.send({ cmd: 'verify-jwt' }, { jwt });
  }

  @MessagePattern({ cmd: 'get-order-userId' })
  async getOrderByUserId(@Payload() playload: {user : UserEntity}) {
    

  
    return this.orderManageService.send({ cmd: 'get-order-user' }, { user: playload.user });
  }
}
