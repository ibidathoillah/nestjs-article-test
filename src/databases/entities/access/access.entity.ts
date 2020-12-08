import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm';
import { RoleAccess } from './role_access.entity';
import { UserAccess } from './user_access.entity';

@Entity({ 
    name: 'accesses'
})
export class Access extends BaseEntity {

    @PrimaryGeneratedColumn({
        type: 'int'
    })
    id: number
 
    @Column({
        type: 'varchar',
        length: 255
    })
    name: string

    @OneToMany(() => UserAccess, userAccesss => userAccesss.access)
    userAccesses: UserAccess[]

    @OneToMany(() => RoleAccess, roleAccesss => roleAccesss.role)
    roleAccesses: RoleAccess[]
}