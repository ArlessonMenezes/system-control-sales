import { IsNotEmpty, IsNumber } from "class-validator";

export class SaleProductDto {
  @IsNotEmpty()
  @IsNumber()
  idProduct: number;
  
  @IsNotEmpty()
  @IsNumber()
  value: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}