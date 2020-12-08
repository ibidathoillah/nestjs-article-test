import { EntityRepository, Repository } from 'typeorm';
import { UserAccess } from '../../databases/entities/Access/user_access.entity';

@EntityRepository(UserAccess)
export class UserAccessRepository extends Repository<UserAccess> {
}