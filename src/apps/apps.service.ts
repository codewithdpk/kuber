import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AppsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllApps() {
    return await this.prismaService.apps.findMany();
  }
}
