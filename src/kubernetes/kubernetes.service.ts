import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as k8s from '@kubernetes/client-node';
import * as shell from 'shelljs';
import { DeployHelmChart } from 'src/apps/dto/k8s.dto';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class KubernetesService {
  private kc: k8s.KubeConfig;
  private k8sApi: k8s.CoreV1Api;

  private chartName = 'kuber';
  private chartRepo = 'https://codewithdpk.github.io/kuber-chart/';

  constructor(private readonly prismaService: PrismaService) {
    this.kc = new k8s.KubeConfig();
    this.kc.loadFromDefault();
    this.k8sApi = this.kc.makeApiClient(k8s.CoreV1Api);
  }

  async listPods(namespace: string) {
    try {
      const podsRes = await this.k8sApi.listNamespacedPod(namespace);
      return podsRes.body;
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deployChart(payload: DeployHelmChart) {
    const releaseRepo = `${this.chartName}/nesthelm`;

    // const releaseName = `${Date.now()}-${this.chartName}`;

    if (
      shell.exec(`helm repo add ${this.chartName} ${this.chartRepo}`).code !== 0
    ) {
      const errorMessage = 'Error: Failed to add Helm repository';
      shell.echo(errorMessage);
      shell.exit(1);
      throw new HttpException(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    if (shell.exec('helm repo update').code !== 0) {
      const errorMessage = 'Error: Failed to update Helm repositories';
      shell.echo(errorMessage);
      shell.exit(1);
      throw new HttpException(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    if (
      shell.exec(
        `helm install ${payload.applicationName} ${releaseRepo} --namespace ${payload.namespace}`,
      ).code !== 0
    ) {
      const errorMessage = 'Error: Failed to install Helm chart';
      shell.echo(errorMessage);
      shell.exit(1);
      throw new HttpException(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return this.prismaService.apps.create({
      data: {
        applicationName: payload.applicationName,
        nameSpace: payload.namespace,
        healthStatus: 'RUNNING',
      },
    });
  }
}
