import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { ProfileEntity } from './profile.entity';
import { OrderEntity } from './order.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_name', type: 'varchar', length: 100 })
  userName: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;

  @Column({ name: 'login_at', type: 'datetime' , nullable : true })
  loginAt: Date;

  @OneToOne(() => ProfileEntity, (profile) => profile.user, { cascade: true })
  @JoinColumn()
  profile: ProfileEntity;

  @OneToMany(() => OrderEntity, (order) => order.user)
  public orders: OrderEntity[];
}
