import { Inject, Injectable } from '@nestjs/common';
import { UserRole } from 'src/databases/entities/role/user_role.entity';
import { UserRoleRepository } from './user_role.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleService } from './role.service';

@Injectable()
export class UserRoleService {

    constructor(
        @InjectRepository(UserRoleRepository, 'postgres')
        private userRolesRepository: UserRoleRepository,

        @Inject('RoleService')
        private roleService: RoleService,
    ) {}
    
    async initNewUserRole(userId: number): Promise<UserRole> {
        // New registered account will automatically have Account role
        return this.userRolesRepository.save({userId:userId, roleId: 2})
    }
    
    async getRolesByUserId(userId: number): Promise<UserRole[]> {
        const userRoles = await this.userRolesRepository.find({userId:userId});
        const rolesDetails = (await this.roleService.getByIds(userRoles.map<number>(role => role.roleId))).reduce(
            (hash, roleDetail) => {
                hash[roleDetail.id] = roleDetail;
                return hash;
        }, {})

        return userRoles.map(
            userRole => Object.assign(userRole, { access : rolesDetails[userRole.roleId] })
        )
    }
    
}
