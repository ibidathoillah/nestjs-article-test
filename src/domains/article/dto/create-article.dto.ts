import { IsNotEmpty, IsString } from 'class-validator';

export class CreateArticleDTO {

    userId: number

    @IsNotEmpty()
    @IsString()
    title: string
    
    @IsNotEmpty()
    @IsString()
    body: string
}