import { AuthGuard } from '@app/shared';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Post,
  UseGuards,
  Request,
  Param,
  Put,
  HttpCode,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Double } from 'typeorm';

@Controller()
export class AppController {
  constructor(
    @Inject('AUTH_SERVICE')
    private authService: ClientProxy,
    @Inject('USER_MANAGEMENT_SERVICE')
    private userManageService: ClientProxy,
    @Inject('PRODUCT_MANAGEMENT_SERVICE')
    private productManageService: ClientProxy,
    @Inject('ORDER_MANAGEMENT_SERVICE')
    private orderManageService: ClientProxy,
  ) {}

  @Get()
  async getUser() {
    return this.authService.send(
      {
        cmd: 'get-users',
      },
      {},
    );
  }

  @Post('auth/register')
  async register(
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const res = await this.authService
      .send(
        {
          cmd: 'register',
        },
        {
          firstName,
          lastName,
          email,
          password,
        },
      )
      .toPromise();

    if (res.error.status === 400) {
      throw new BadRequestException(res.error.message);
    }

    return res;
  }

  @Post('auth/login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.authService.send(
      {
        cmd: 'login',
      },
      {
        email,
        password,
      },
    );
  }

  @UseGuards(AuthGuard)
  @Get('user/profile')
  async getProfile(@Request() req) {
    const header = req.headers['authorization'];
    const authHeaderParts = (header as string).split(' ');
    const [, jwt] = authHeaderParts;
    return this.authService.send({ cmd: 'verify-jwt' }, { jwt });
  }


  @UseGuards(AuthGuard)
  @Get('user/orders')
  async getOrderByUserId(@Request() req) {
    const header = req.headers['authorization'];
    const authHeaderParts = (header as string).split(' ');
    const [, jwt] = authHeaderParts;
    const {user} = await this.authService.send({ cmd: 'verify-jwt' }, { jwt }).toPromise();
    
    return this.userManageService.send({ cmd: 'get-order-userId' }, { user });
  }

  @UseGuards(AuthGuard)
  @Post('product/create')
  async createProduct(
    @Body('skuCode') skuCode: string,
    @Body('skuName') skuName: string,
    @Body('unitPrice') unitPrice: number,
  ) {
    return this.productManageService.send(
      {
        cmd: 'create-product',
      },
      {
        skuCode,
        skuName,
        unitPrice,
      },
    );
  }

  @UseGuards(AuthGuard)
  @Get('product/all')
  async getAllProduct() {
    return this.productManageService.send(
      {
        cmd: 'get-all-product',
      },
      {},
    );
  }

  @UseGuards(AuthGuard)
  @Get('product/:id')
  async getProductById(@Param('id') id: number) {
    return this.productManageService.send(
      {
        cmd: 'get-product-id',
      },
      { id },
    );
  }

  @UseGuards(AuthGuard)
  @Post('order/create')
  async orderCreate(
    @Request() req,
    @Body('items')
    items: { productId: number; unitPrice: number; amout: number }[],
  ) {
    const header = req.headers['authorization'];
    const authHeaderParts = (header as string).split(' ');
    const [, jwt] = authHeaderParts;
    const { user } = await this.authService
      .send({ cmd: 'verify-jwt' }, { jwt })
      .toPromise();

    return this.orderManageService.send(
      {
        cmd: 'create-order',
      },
      { user, items },
    );
  }

  @UseGuards(AuthGuard)
  @Get('order/all')
  async getAllOrder() {
    return this.orderManageService.send(
      {
        cmd: 'get-order-all',
      },
      {  },
    );
  }

  @UseGuards(AuthGuard)
  @Put('order/cancle/:id')
  @HttpCode(201)
  async orderCancele(@Request() req , @Param('id') id: number) {

    return this.orderManageService.send(
      {
        cmd: 'order-cancel',
      },
      { id },
    );
  }
}
