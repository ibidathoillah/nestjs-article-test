import { EntityRepository, Repository } from 'typeorm';
import { RoleAccess } from '../../databases/entities/access/role_access.entity';

@EntityRepository(RoleAccess)
export class RoleAccessRepository extends Repository<RoleAccess> {
}