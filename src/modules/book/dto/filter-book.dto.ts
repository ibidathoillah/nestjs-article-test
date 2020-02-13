import { IsOptional, IsBoolean } from "class-validator";

export class FilterBookDTO {

    @IsOptional()
    is_published: boolean
}