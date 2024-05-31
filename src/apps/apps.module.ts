import { Module } from '@nestjs/common';
import { AppsController } from './apps.controller';
import { AppsService } from './apps.service';
import { KubernetesService } from 'src/kubernetes/kubernetes.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [AppsController],
  providers: [AppsService, KubernetesService, PrismaService],
})
export class AppsModule {}
