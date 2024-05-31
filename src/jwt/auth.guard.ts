import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;

    if (!token) {
      throw new UnauthorizedException('Unauthorized');
    }

    try {
      await this.jwtService.verify(token, {
        secret: '{opVlM~TY!gwq#`',
      });
    } catch (e) {
      throw new UnauthorizedException('Unauthorized');
    }

    next();
  }
}
