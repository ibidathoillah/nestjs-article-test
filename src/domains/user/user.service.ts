import { Injectable, ConflictException, NotFoundException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { CollectUserDetailsDto, CollectUserDto } from './dto/collect-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../../databases/entities/user/user.entity';
import * as bcrypt from 'bcrypt';
import { UserRoleService } from '../role/user_role.service';
import { GrantAccessUserDto } from './dto/grant-access';
import { UserAccessService } from '../access/user_access.service';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserRepository, 'postgres')
        private userRepository: UserRepository,

        @Inject('UserRoleService')
        private userRoleService: UserRoleService,

        @Inject('UserAccessService')
        private userAccessService: UserAccessService
        
    ) {}

    async createUser(newUser: CreateUserDto): Promise<CollectUserDto> {
        const existsEmail = await this.userRepository.findOne({ email: newUser.email })

        if (existsEmail) throw new ConflictException('duplicate email')

        const salt = await bcrypt.genSalt()
        newUser.password = await bcrypt.hash(newUser.password, salt)
        const user = await this.userRepository.save(newUser)
        await this.userRoleService.createUserRole(user.id);
        
        return await this.getUserDetails(user.id)
    }

    async grantAccess(grantPayload: GrantAccessUserDto, userId: number): Promise<CollectUserDto> {
        const user = await this.getById(userId)
        await this.userAccessService.grantAccessUser(user.id, grantPayload.accessName);
        
        return await this.getUserDetails(user.id)
    }

    async getAllUser(): Promise<CollectUserDto[]> {
        const users = await this.userRepository.find()
        return users
    }

    async getUserDetails(id: number): Promise<CollectUserDetailsDto> {
        const userDetails =  await this.getById(id)
        userDetails.userRoles = await this.userRoleService.getRolesByUserId(id)
        userDetails.userAccesses = await this.userAccessService.getAccesssByUserId(id)
        
        return userDetails
    }

    private async getById(id: number): Promise<User> {
        const user = await this.userRepository.findOne(id)
        if (!user) throw new NotFoundException('user not found')
        return user
    }
    
    async getUserByEmai(email: string): Promise<User> {
        const user = await this.userRepository.findOne({email:email})
        if (!user) throw new NotFoundException('user not found')
        return user
    }
    

}
