import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../user/user.repository';
import { CredentialDTO } from './dto/credential.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserRepository, 'postgres')
        private userRepository: UserRepository,

        private jwtService: JwtService
    ) {}

    async signIn(credential: CredentialDTO): Promise<any> {
        const { username, password } = credential

        const user = await this.userRepository.findOne({ username })

        if (user) {
            const samePassword = await bcrypt.compare(password, user.password)
            if (samePassword) {
                const payload = {
                    sub: user.id,
                    username: user.username
                }
                return {
                    access_token: this.jwtService.sign(payload)
                }
            }
        } 
        
        throw new UnauthorizedException('username of password not valid')
        
    }
}
