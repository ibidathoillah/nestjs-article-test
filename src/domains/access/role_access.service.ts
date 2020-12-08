import { Inject, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { RoleAccessRepository } from './role_access.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AccessService } from './access.service';
import { RoleAccess } from 'src/databases/entities/access/role_access.entity';

@Injectable()
export class RoleAccessService {

    constructor(
        @InjectRepository(RoleAccessRepository, 'postgres')
        private roleAccessesRepository: RoleAccessRepository,

        @Inject('AccessService')
        private accessService: AccessService,
    ) {}
    
    async getAccessesByRoleId(roleId: number): Promise<RoleAccess[]> {
        const roleAccesses = await this.roleAccessesRepository.find({roleId:roleId});
        const accesssDetails = (await this.accessService.getByIds(roleAccesses.map<number>(access => access.accessId))).reduce(
            (hash, accessDetail) => {
                hash[accessDetail.id] = accessDetail;
                return hash;
        }, {})

        return roleAccesses.map(
            roleAccess => Object.assign(roleAccess, { access : accesssDetails[roleAccess.accessId] })
        )
    }

}
