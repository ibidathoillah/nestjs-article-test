import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CredentialDTO } from './dto/credential.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {

    constructor(
        @Inject('UserService')
        private userService: UserService,
        
        private jwtService: JwtService
    ) {}

    async signIn(credential: CredentialDTO): Promise<any> {
        const { email, password } = credential
        const user = await this.userService.getUserByEmai(email)

        if (user && password) {
            const samePassword = await bcrypt.compare(password, user.password)
            if (samePassword) {
                const loggedUser = {
                    id: user.id,
                    email: user.email
                }
                return {
                    access_token: this.jwtService.sign(loggedUser)
                }
            }
        } 
        
        throw new UnauthorizedException('email of password not valid')
        
    }

    async register(newUser: RegisterDto): Promise<any> {
        return await this.userService.createUser(newUser)
    }

    
}
