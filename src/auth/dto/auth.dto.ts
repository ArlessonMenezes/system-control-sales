import { IsNotEmpty, IsString } from "class-validator";

export class AuthDto {
  @IsString()
  @IsNotEmpty()
  register: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}