import { IsString } from 'class-validator';

export class LoginUserDto {
  @IsString({ message: 'must be srting' })
  readonly login: string;

  @IsString({ message: 'must be srting' })
  readonly password: string;
}
