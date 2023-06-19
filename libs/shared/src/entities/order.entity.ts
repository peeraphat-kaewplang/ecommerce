import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { OrderDetailEntity } from './order-detail.entity';
import { UserEntity } from './user.entity';

@Entity('order')
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'order_date', type: 'datetime' })
  orderDate: Date;

  @Column({
    name: 'total_price',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
  })
  totalPrice: number;

  @Column({name: 'is_cancel' , type: 'boolean'})
  isCancel : boolean

  @OneToMany(() => OrderDetailEntity, (orderDetail) => orderDetail.order)
  public orderDetail: OrderDetailEntity[];

  @ManyToOne(() => UserEntity, (user) => user.orders)
  public user: UserEntity;
}
