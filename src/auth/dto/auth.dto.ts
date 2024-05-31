import { IsDefined, IsEmail, IsString } from 'class-validator';

export class CreateUser {
  @IsDefined()
  @IsString()
  username: string;

  @IsDefined()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsString()
  password: string;
}

export class LoginUser {
  @IsDefined()
  @IsString()
  username: string;

  @IsDefined()
  @IsString()
  password: string;
}

export interface User {
  id: number;
  userName: string;
  userEmail: string;
  createdAt: Date;
}
