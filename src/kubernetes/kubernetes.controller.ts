import { Controller, Get, Param } from '@nestjs/common';
import { KubernetesService } from './kubernetes.service';
import { GetPods } from './dto/k8s.dto';

@Controller('kubernetes')
export class KubernetesController {
  constructor(private readonly k8sService: KubernetesService) {}

  @Get(':namespace')
  async getItem(@Param() params: GetPods) {
    return await this.k8sService.listPods(params.namespace);
  }
}
