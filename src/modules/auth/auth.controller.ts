import { Controller, Body, Post, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
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
}
