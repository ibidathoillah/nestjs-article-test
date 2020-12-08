import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, UpdateDateColumn, CreateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { RoleAccess } from '../access/role_access.entity';
import { UserRole } from './user_role.entity';

@Entity({ 
    name: 'roles'
})
export class Role extends BaseEntity {

    @PrimaryGeneratedColumn({
        type: 'int'
    })
    id: number
 
    @Column({
        type: 'varchar',
        length: 255
    })
    name: string

    @OneToMany(() => UserRole, userRoles => userRoles.role)
    userRoles: UserRole[]

    @OneToMany(() => RoleAccess, roleAccess => roleAccess.role)
    roleAccesses: RoleAccess[]
}

