import { Controller, Body, Post, UseInterceptors, ClassSerializerInterceptor, UsePipes } from '@nestjs/common';
import { Validation } from 'src/config/validation.pipe';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { CredentialDTO } from './dto/credential.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ) {}
    
    @Post('login')
    @UseInterceptors(ClassSerializerInterceptor)
    signIn(@Body() credential: CredentialDTO) {
        return this.authService.signIn(credential)
    }

    @Post('register')
    @UseInterceptors(ClassSerializerInterceptor)
    @UsePipes(Validation)
    createUser(@Body() newUser: CreateUserDto) {
        return this.authService.register(newUser)
    }
}
