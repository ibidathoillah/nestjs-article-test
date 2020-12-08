import { Inject, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UserAccessRepository } from './user_access.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AccessService } from './access.service';
import { UserAccess } from 'src/databases/entities/access/user_access.entity';

@Injectable()
export class UserAccessService {

    constructor(
        @InjectRepository(UserAccessRepository, 'postgres')
        private userAccesssRepository: UserAccessRepository,

        @Inject('AccessService')
        private accessService: AccessService,
    ) {}
    
    async grantAccessUser(userId:number, accessName: string): Promise<UserAccess> {
        const newAccess = await this.accessService.getByName(accessName);

        if(await this.isUserHaveAccess(userId, newAccess.id))
        throw new UnprocessableEntityException(`user already have access ${accessName}`)
        
        return this.userAccesssRepository.save({userId:userId, accessId: newAccess.id})
    }
    
    async getAccesssByUserId(userId: number): Promise<UserAccess[]> {
        const userAccesss = await this.userAccesssRepository.find({userId:userId});
        const accesssDetails = (await this.accessService.getByIds(userAccesss.map<number>(access => access.accessId))).reduce(
            (hash, accessDetail) => {
                hash[accessDetail.id] = accessDetail;
                return hash;
        }, {})

        return userAccesss.map(
            userAccess => userAccess.access = accesssDetails[userAccess.accessId]
        )
    }

    async isUserHaveAccess(userId:number, accessId: number): Promise<Boolean> {
        const userAccess = await this.userAccesssRepository.findOne({accessId: accessId, userId: userId })
        return userAccess ? true : false
    }
}
