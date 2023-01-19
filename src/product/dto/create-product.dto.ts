import { IsString, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsNumber()
    @IsNotEmpty()
    quantity: number;

    @IsNumber()
    @IsNotEmpty()
    numberRegister: number;

    @IsNumber()
    @IsOptional()
    idBrand?: number;

    @IsNumber()
    @IsOptional()
    idCategory?: number;
}