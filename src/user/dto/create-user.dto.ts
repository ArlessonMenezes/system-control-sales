import { IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  register: string;

  @IsNumberString()
  @IsNotEmpty()
  password: string;
}