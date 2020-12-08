import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAccessDTO {
    
    @IsNotEmpty()
    @IsString()
    name: string
}