import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateBookDto {
    @IsOptional()
    @IsString()
    name:string
    @IsOptional()
    @IsNumber()
    authorId:number
}