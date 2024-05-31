import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { KubernetesService } from './kubernetes/kubernetes.service';
import { KubernetesModule } from './kubernetes/kubernetes.module';

@Module({
  imports: [UsersModule, AuthModule, KubernetesModule],
  controllers: [AppController],
  providers: [AppService, KubernetesService],
})
export class AppModule {}
