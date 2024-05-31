import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUser, LoginUser } from './dto/auth.dto';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('signup')
  async signup(@Body() payload: CreateUser) {
    const userExist = await this.userService.isUserExist(payload.username);

    if (userExist) {
      throw new HttpException(
        'The provided user already registered, please try to login',
        HttpStatus.NOT_FOUND,
      );
    }

    return this.userService.createUser(payload);
  }

  @Post('login')
  async login(@Body() payload: LoginUser) {
    const userExist = await this.userService.isUserExist(payload.username);

    if (!userExist) {
      throw new HttpException(
        'The provided user does not exist, please try to register',
        HttpStatus.NOT_FOUND,
      );
    }

    const userValid = await this.userService.validateUser(payload);

    if (userValid) {
      return {
        access_token: this.jwtService.sign(
          { username: payload.username, id: userValid.id },
          {
            secret: '{opVlM~TY!gwq#`',
          },
        ),
      };
    } else {
      throw new HttpException('Invalid credientials', HttpStatus.BAD_REQUEST);
    }
  }
}
