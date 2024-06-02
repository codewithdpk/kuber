import { IsDefined, IsString } from 'class-validator';

export class GetPods {
  @IsDefined()
  @IsString()
  namespace: string;
}

export class DeployHelmChart {
  @IsDefined()
  @IsString()
  namespace: string;

  @IsDefined()
  @IsString()
  applicationName: string;
}

export interface PodMetadata {
  creationTimestamp: Date;
  generateName: string;
  labels: Labels;
}

export interface Labels {
  app: string;
  'pod-template-hash': string;
}
