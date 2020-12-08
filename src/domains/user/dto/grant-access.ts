import { IsNotEmpty } from "class-validator"

export class GrantAccessUserDto {

    @IsNotEmpty()
    accessName: string
}