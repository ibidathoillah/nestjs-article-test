import { EntityRepository, Repository } from 'typeorm';
import { UserRole } from '../../databases/entities/role/user_role.entity';

@EntityRepository(UserRole)
export class UserRoleRepository extends Repository<UserRole> {
}