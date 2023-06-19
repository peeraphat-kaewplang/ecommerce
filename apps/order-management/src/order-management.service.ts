import {
  OrderDetailEntity,
  OrderEntity,
  ProductEntity,
  UserEntity,
} from '@app/shared';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { NewOrderDTO } from './dtos/order.dto';
import { async } from 'rxjs';

@Injectable()
export class OrderManagementService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(OrderDetailEntity)
    private readonly detailRepository: Repository<OrderDetailEntity>,
  ) {}

  async getAllOrder() {
      return this.orderRepository.find({
        relations : {
          orderDetail : {
            product : true
          }
        },
        where: {
          isCancel: false,
        },
      })
  }

  async getOrderByUserId(user:UserEntity) {

    return this.orderRepository.find({
      relations : {
        orderDetail : {
          product : true
        }
      },
      where: {
        user : {
          id : user.id
        }
      },
    })
}
  
  async cancelOrder(id : number ) {

    const order = await this.orderRepository.findOne({
      where: {
        id : id
      }})

      if(!order) {
        throw new BadRequestException('order is exit')
      }

      order.isCancel = true 

      return this.orderRepository.save(order)
  }

  async createOrder(user: UserEntity, items: NewOrderDTO[]) {
    const usr = await this.userRepository.findOne({
      where: {
        id: user.id,
      },
    });

    const order: OrderEntity = new OrderEntity();
    
    const totalPrice = items.reduce(
      (sum, val) => sum + val.unitPrice * val.amout,
      0,
    );
    const prodId = items.map((val) => val.productId);

    order.isCancel = false;
    order.orderDate = new Date(Date.now());
    order.totalPrice = totalPrice;
    order.user = usr;

    const products = await this.productRepository.findBy({
      id: In([prodId]),
    });
    const or = await this.orderRepository.save(order);
    products.forEach(async (pro , i) => {
      const ordrDetail: OrderDetailEntity = new OrderDetailEntity();
      ordrDetail.order = or;
      ordrDetail.product = pro
      ordrDetail.amout = items[i].amout
      await this.detailRepository.save(ordrDetail);
    });
    
   
    return or;
  }
}
