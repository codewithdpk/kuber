import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUser, LoginUser, User } from '../auth/dto/auth.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(payload: CreateUser) {
    const userObj = {
      userName: payload.username,
      userEmail: payload.email,
      userPassword: await bcrypt.hash(payload.password, 10),
    };
    return this.prismaService.user.create({ data: userObj });
  }

  async validateUser(payload: LoginUser): Promise<User> {
    const user = await this.prismaService.user.findFirst({
      where: { userName: payload.username },
    });
    if (user && (await bcrypt.compare(payload.password, user.userPassword))) {
      return user as User;
    }
    return null;
  }

  async isUserExist(username: string): Promise<boolean> {
    const user = await this.prismaService.user.findFirst({
      where: { userName: username },
    });
    if (user) {
      return true;
    }
    return false;
  }
}
