import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  MysqlDBModule,
  SharedModule,
  ProfileEntity,
  UserEntity,
  OrderEntity,
  OrderDetailEntity,
  ProductEntity,
} from '@app/shared';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtGuard } from './jwt/jwt.guard';
import { JwtStrategy } from './jwt/jwt-strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '3600s' },
      }),
      inject: [ConfigService],
    }),
    SharedModule,
    MysqlDBModule,
    TypeOrmModule.forFeature([
      UserEntity,
      ProfileEntity,
      OrderEntity,
      OrderDetailEntity,
      ProductEntity
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtGuard, JwtStrategy],
})
export class AuthModule {}
