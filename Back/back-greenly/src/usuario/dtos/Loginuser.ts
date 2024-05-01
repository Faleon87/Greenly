import { IsString } from 'class-validator';

export class LoginUser {
  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;
}
