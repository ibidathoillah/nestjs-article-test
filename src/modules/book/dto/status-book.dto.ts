import { IsBoolean } from "class-validator";

export class StatusBookDTO {

    @IsBoolean()
    status: boolean
}