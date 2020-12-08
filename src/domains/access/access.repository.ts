import { EntityRepository, Repository } from 'typeorm';
import { Access } from '../../databases/entities/access/access.entity';

@EntityRepository(Access)
export class AccessRepository extends Repository<Access> {
}