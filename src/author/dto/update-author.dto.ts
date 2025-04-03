import { IsNotEmpty, IsString } from "class-validator";
import { strict } from "node:assert";

export class UpdateAuthorDto {
    @IsString()
    @IsNotEmpty()
    name : string
}
