import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('profile')
export class ProfileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name', type: 'varchar', length : 100 })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', length : 100 })
  lastName: string;

  @Column({ name: 'create_date', type: 'datetime' })
  createDate: Date;

  @Column({ name: 'update_date', type: 'datetime' })
  updateDate: Date;

  @OneToOne(() => UserEntity, (user) => user.profile)
  user: UserEntity;
 
}
