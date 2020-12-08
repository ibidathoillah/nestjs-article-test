import { Repository, EntityRepository } from "typeorm";
import { User } from "../../databases/entities/user/user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {}