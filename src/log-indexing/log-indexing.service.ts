import { Injectable, Logger } from '@nestjs/common';
import { KubernetesService } from 'src/kubernetes/kubernetes.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LogIndexingService {
  private readonly logger = new Logger(LogIndexingService.name);

  public pods: { namespace: string; pods: string[] }[];
  constructor(
    private readonly prismaService: PrismaService,
    private readonly k8sService: KubernetesService,
  ) {
    this.init();
  }

  async init() {
    const applications = await this.prismaService.apps.findMany();

    this.pods = applications.map((pod) => {
      return {
        namespace: pod.nameSpace,
        pods: pod.pods,
      };
    });

    if (this.pods.length) {
      this.pods.forEach((podObj) => {
        podObj.pods.forEach((pod) => {
          this.k8sService.getLogs(podObj.namespace, pod, 'nesthelm');
        });
      });
    }
  }
}
