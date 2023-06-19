import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { UserEntity , ProfileEntity } from '@app/shared';
import { NewUserDTO } from './dtos/user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDTO } from './dtos/user-login.dto';

@Injectable()
export class AuthService  {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async getUsers() {
    //  return this.userRepository.find();
    return "asdsad"
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOne({
      relations: {
        profile: true,
      },
      where: {
        userName: email,
      },
    });
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async createUser(newUser: Readonly<NewUserDTO>): Promise<UserEntity> {
    const { firstName, lastName, email, password } = newUser;
    const profile: ProfileEntity = new ProfileEntity();
    const user: UserEntity = new UserEntity();

    const hashedPassword = await this.hashPassword(password);

    profile.firstName = firstName;
    profile.lastName = lastName;

    profile.createDate = new Date(Date.now());
    profile.updateDate = new Date(Date.now());

    user.userName = email;
    user.password = hashedPassword;
    user.profile = profile;

    return this.userRepository.save(user);
  }

  async doesPasswordMatch(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async validateUser(email: string, password: string): Promise<UserEntity> {
    const user = await this.findByEmail(email);

    const doesUserExist = !!user;

    if (!doesUserExist) return null;

    const doesPasswordMatch = await this.doesPasswordMatch(
      password,
      user.password,
    );

    if (!doesPasswordMatch) return null;

    return user;
  }

  async login(userLogin: Readonly<UserLoginDTO>) {
    const { email, password } = userLogin;
    const user = await this.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    delete user.password;
    user.loginAt = new Date(Date.now());

    this.userRepository.save(user);

    const jwt = await this.jwtService.signAsync({ user });

    return { token: jwt, user };
  }

  async verifyJwt(jwt: string): Promise<{ user: UserEntity; exp: number }> {
    if (!jwt) {
      throw new UnauthorizedException();
    }

    try {
      const { user, exp } = await this.jwtService.verifyAsync(jwt);
      return { user, exp };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
