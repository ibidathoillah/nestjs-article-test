import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../user/user.repository';
import { CredentialDTO } from './dto/credential.dto';
import * as bcrypt from 'bcrypt';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserRepository, 'postgres')
        private userRepository: UserRepository
    ) {}

    async signIn(credential: CredentialDTO): Promise<User> {
        const { username, password } = credential

        const user = await this.userRepository.findOne({ username })

        if (user) {
            const samePassword = await bcrypt.compare(password, user.password)
            if (samePassword) {
                return user
            }
        } 
        
        throw new UnauthorizedException('username of password not valid')
        
    }
}
