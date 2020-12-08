import { Injectable } from "@nestjs/common";
import { OnModuleInit } from "@nestjs/common/interfaces/modules/on-init.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { AccessRepository } from "src/domains/access/access.repository";
import { RoleRepository } from "src/domains/role/role.repository";
import { UserRepository } from "src/domains/user/user.repository";
import * as bcrypt from 'bcrypt';
import { UserRoleRepository } from "src/domains/role/user_role.repository";
import { RoleAccessRepository } from "src/domains/access/role_access.repository";

@Injectable()
export class SeederSevice implements OnModuleInit {
  
    constructor(
        @InjectRepository(RoleRepository, 'postgres')
        private rolesRepository: RoleRepository,

        @InjectRepository(AccessRepository, 'postgres')
        private accessRepository: AccessRepository,

        @InjectRepository(RoleAccessRepository, 'postgres')
        private roleAccessRepository: RoleAccessRepository,

        @InjectRepository(UserRepository, 'postgres')
        private userRepository: UserRepository,

        @InjectRepository(UserRoleRepository, 'postgres')
        private userRoleRepository: UserRoleRepository

    ) {}

    private async initRoles(){
        await this.rolesRepository.save({
            id: 1,
            name: 'SystemAdmin'
        })

        await this.rolesRepository.save({
            id: 2,
            name: 'Account'
        })
    }

    private async initAccess(){
        await this.accessRepository.save({
            id: 1,
            name: 'ArticleStore'
        })

        await this.accessRepository.save({
            id: 2,
            name: 'ArticleAdminUpdate'
        })

        await this.accessRepository.save({
            id: 3,
            name: 'ArticleOwnerUpdate'
        })
    }

    private async initRoleAccess(){
        await this.roleAccessRepository.save({
            id:1,
            roleId: 2,
            accessId: 1
        })

        await this.roleAccessRepository.save({
            id:2,
            roleId: 2,
            accessId: 3
        })
    }

    private async initUser(){
        const salt = await bcrypt.genSalt()

        await this.userRepository.save({
            id: 1,
            fullName: "Ibid Admin",
            email: "admin@admin.com",
            password: await bcrypt.hash("admin",salt),
            gender: "L"
        })

        await this.userRoleRepository.save({
            userId: 1,
            roleId: 1,
        })

        await this.userRepository.save({
            id: 2,
            fullName: "Intotu Admin",
            email: "intotu@gmail.com",
            password: await bcrypt.hash("intotu",salt),
            gender: "Laki"
        })

        await this.userRoleRepository.save({
            userId: 2,
            roleId: 1,
        })

        await this.userRepository.save({
            id: 3,
            fullName: "Jaja Admin",
            email: "jaja@gmail.com",
            password: await bcrypt.hash("jaja",salt),
            gender: "Laki"
        })

        await this.userRoleRepository.save({
            userId: 3,
            roleId: 1,
        })
    }

    private async seed(){
        await this.initRoles();
        await this.initAccess();
        await this.initUser()
        await this.initRoleAccess()
    }

    async onModuleInit() {
        console.log(`Seeding...`);
        await this.seed();
        console.log(`Seeding completed!`);
      }
    
}