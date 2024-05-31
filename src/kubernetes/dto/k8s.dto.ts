import { IsDefined, IsString } from 'class-validator';

export class GetPods {
  @IsDefined()
  @IsString()
  namespace: string;
}
