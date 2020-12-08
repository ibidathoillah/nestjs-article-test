import { IsString, MinLength, MaxLength, IsEmail } from "class-validator"

export class CredentialDTO {
    
    @IsString({ message: 'email harus alfanumerik' })
    @MinLength(8, { message: 'email minimal 8 karakter' })
    @MaxLength(100, { message: 'email maksimal 100 karakter' })
    @IsEmail()
    email: string

    @IsString({ message: 'password harus alfanumerik' })
    @MinLength(8, { message: 'password minimal 8 karakter' })
    @MaxLength(12, { message: 'password maksimal 12 karakter' })
    password: string
}