import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateBrandDto {
  @IsNumber()
  @IsNotEmpty()
  idProduct: number;

  @IsString()
  @IsNotEmpty()
  name: string;
}