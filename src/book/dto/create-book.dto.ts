import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateBookDto {
    @IsString()
    @IsNotEmpty()
    name:string
    @IsNotEmpty()
    @IsNumber()
    authorId:number
}
