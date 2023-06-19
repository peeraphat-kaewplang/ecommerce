import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  Double,
  OneToMany,
} from 'typeorm';
import { OrderDetailEntity } from './order-detail.entity';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'sku_code', type: 'varchar', length: 50 })
  skuCode: string;

  @Column({ name: 'sku_name', type: 'varchar', length: 100 })
  skuName: string;

  @Column({
    name: 'unit_price',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
  })
  unitPrice: number;

  @Column({ name: 'create_date', type: 'datetime' })
  createDate: Date;

  @Column({ name: 'update_date', type: 'datetime' })
  updateDate: Date;

  @OneToMany(() => OrderDetailEntity, (orderDetail) => orderDetail.product)
  public orderDetail: OrderDetailEntity[];
}
