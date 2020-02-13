import { IsString, MinLength, MaxLength } from "class-validator"

export class CredentialDTO {
    
    @IsString({ message: 'username harus alfanumerik' })
    @MinLength(8, { message: 'username minimal 8 karakter' })
    @MaxLength(12, { message: 'username maksimal 12 karakter' })
    username: string

    @IsString({ message: 'password harus alfanumerik' })
    @MinLength(8, { message: 'password minimal 8 karakter' })
    @MaxLength(12, { message: 'password maksimal 12 karakter' })
    password: string
}