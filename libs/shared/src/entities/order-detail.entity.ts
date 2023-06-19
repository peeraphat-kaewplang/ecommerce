import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    Double,
    ManyToOne,
  } from 'typeorm';
import { OrderEntity } from './order.entity';
import { ProductEntity } from './product.entity';
  
  @Entity('order_detail')
  export class OrderDetailEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    amout: number;

    @ManyToOne(() => OrderEntity, (order) => order.orderDetail)
    public order: OrderEntity

    @ManyToOne(() => ProductEntity, (product) => product.orderDetail)
    public product: ProductEntity
  }
  