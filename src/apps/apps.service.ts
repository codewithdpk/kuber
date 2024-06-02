import { Injectable } from '@nestjs/common';
import { KubernetesService } from 'src/kubernetes/kubernetes.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AppsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly k8sService: KubernetesService,
  ) {}

  async getAllApps() {
    const apps = await this.prismaService.apps.findMany();

    const namespaces = apps.map((app) => app.nameSpace);

    const prodsDataPromise = namespaces.map((namespace) => {
      return this.k8sService.getPodsByNamespace(namespace);
    });

    const mappedAppsWithPods = [];

    await Promise.all(prodsDataPromise).then((data) => {
      console.log(data);
      data.forEach((podsdata) => {
        const appObjIndex = apps.findIndex(
          (app) => app.nameSpace === podsdata[0].metadata.namespace,
        );

        if (appObjIndex !== -1) {
          mappedAppsWithPods.push({
            ...apps[appObjIndex],
            pods: podsdata.map((pod) => pod?.metadata),
          });
        }
      });
    });

    return mappedAppsWithPods;
  }
}
