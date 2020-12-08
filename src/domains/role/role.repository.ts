import { EntityRepository, Repository } from 'typeorm';
import { Role } from '../../databases/entities/role/role.entity';

@EntityRepository(Role)
export class RoleRepository extends Repository<Role> {
}