import { ProfileEntity, UserEntity } from '@app/shared';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NewUserDTO } from 'apps/auth/src/dtos/user.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserManagementService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findUserAll() {
    //  return this.userRepository.find();
    return 'asdsad';
  }

  // async findByEmail(email: string): Promise<UserEntity> {
  //   return this.userRepository.findOne({
  //     relations: {
  //       profile: true,
  //     },
  //     where: {
  //       userName: email,
  //     },
  //   });
  // }

  // async hashPassword(password: string): Promise<string> {
  //   return bcrypt.hash(password, 12);
  // }

  // async createUser(newUser: Readonly<NewUserDTO>): Promise<UserEntity> {
  //   const { firstName, lastName, email, password } = newUser;
  //   const profile: ProfileEntity = new ProfileEntity();
  //   const user: UserEntity = new UserEntity();

  //   const hashedPassword = await this.hashPassword(password);

  //   profile.firstName = firstName;
  //   profile.lastName = lastName;

  //   profile.createDate = new Date(Date.now());
  //   profile.updateDate = new Date(Date.now());

  //   user.userName = email;
  //   user.password = hashedPassword;
  //   user.profile = profile;

  //   return this.userRepository.save(user);
  // }
}
