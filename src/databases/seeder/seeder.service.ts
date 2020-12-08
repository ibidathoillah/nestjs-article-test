import { Injectable } from "@nestjs/common";
import { OnModuleInit } from "@nestjs/common/interfaces/modules/on-init.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { AccessRepository } from "src/domains/access/access.repository";
import { RoleRepository } from "src/domains/role/role.repository";

@Injectable()
export class SeederSevice implements OnModuleInit {

    constructor(
        @InjectRepository(RoleRepository, 'postgres')
        private rolesRepository: RoleRepository,

        @InjectRepository(AccessRepository, 'postgres')
        private accessRepository: AccessRepository

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

    private async seed(){
        await this.initRoles();
        await this.initAccess();
    }

    async onModuleInit() {
        console.log(`Seeding...`);
        await this.seed();
        console.log(`Seeding completed!`);
      }
    
}