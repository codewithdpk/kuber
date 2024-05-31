import { Module } from '@nestjs/common';
import { KubernetesService } from './kubernetes.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [KubernetesService, PrismaService],
})
export class KubernetesModule {}
