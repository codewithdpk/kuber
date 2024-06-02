import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { KubernetesService } from 'src/kubernetes/kubernetes.service';
import { DeployHelmChart, GetPods } from './dto/k8s.dto';
import { AppsService } from './apps.service';

@Controller('apps')
export class AppsController {
  constructor(
    private readonly k8sService: KubernetesService,
    private readonly appsService: AppsService,
  ) {}

  @Get('pods/:namespace')
  async getItem(@Param() params: GetPods) {
    return await this.k8sService.listPods(params.namespace);
  }

  @Post('deploy')
  async deployHelmChart(@Body() payload: DeployHelmChart) {
    return this.k8sService.deployChart(payload);
  }

  @Get()
  async getAllApps() {
    return this.appsService.getAllApps();
  }
}
