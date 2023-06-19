import { Controller, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserEntity } from '@app/shared';
import { NewUserDTO } from './dtos/user.dto';
import { JwtGuard } from './jwt/jwt.guard';
import { UserLoginDTO } from './dtos/user-login.dto';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @MessagePattern({ cmd: 'verify-jwt' })
  @UseGuards(JwtGuard)
  async verifyJwt(@Payload() payload: { jwt: string }) {
    // console.log(payload.jwt)
    return this.authService.verifyJwt(payload.jwt);
  }

  @MessagePattern({ cmd: 'login' })
  async login(@Payload() userLogin: UserLoginDTO) {
    return this.authService.login(userLogin);
  }

  @MessagePattern({ cmd: 'register' })
  async register(@Payload() newUser: NewUserDTO): Promise<{
    user: UserEntity;
    error?: { status: number; message: string };
  }> {
    const existingUser = await this.authService.findByEmail(newUser.email);

    if (existingUser) {
      return {
        user: existingUser,
        error: {
          status: HttpStatus.BAD_REQUEST,
          message: 'An account with that email already exists!',
        },
      };
    }
    const user = await this.authService.createUser(newUser);
    return { user, error: null };
  }
}
