import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { KubernetesService } from './kubernetes/kubernetes.service';
import { KubernetesModule } from './kubernetes/kubernetes.module';
import { AuthMiddleware } from './jwt/auth.guard';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AppsModule } from './apps/apps.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    KubernetesModule,
    JwtModule.registerAsync({
      useFactory() {
        return {
          secretOrPrivateKey: '{opVlM~TY!gwq#`',
          signOptions: { expiresIn: '60m' },
        };
      },
    }),
    AppsModule,
  ],
  controllers: [AppController],
  providers: [AppService, KubernetesService, JwtService, PrismaService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(
      {
        path: 'apps/:namespace',
        method: RequestMethod.ALL,
      },
      {
        path: 'apps/deploy',
        method: RequestMethod.ALL,
      },
    );
  }
}
