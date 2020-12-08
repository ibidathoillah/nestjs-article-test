import { UserAccess } from "src/databases/entities/access/user_access.entity"
import { UserRole } from "src/databases/entities/role/user_role.entity"

export class CollectUserDto {
    email: string
    createdAt: string
    updatedAt: string
}

export class CollectUserDetailsDto {
    email: string
    createdAt: string
    updatedAt: string
    userRoles: UserRole[]
    userAccesses: UserAccess[]
}