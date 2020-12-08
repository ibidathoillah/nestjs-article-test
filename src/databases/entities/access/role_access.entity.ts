import { Entity, BaseEntity, PrimaryGeneratedColumn, JoinColumn, ManyToOne, Column } from 'typeorm';
import { Access } from './access.entity';
import { Role } from '../role/role.entity';

@Entity({ 
    name: 'role_access'
})
export class RoleAccess extends BaseEntity {

    @PrimaryGeneratedColumn({
        type: 'int'
    })
    id: number

    @Column({
        type: 'int',
    })
    roleId: number

    @Column({
        type: 'int',
    })
    accessId: number

    @ManyToOne(() => Role, role => role.roleAccesses, { 
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'roleId' })
    role: Role

    @ManyToOne(() => Access, access => access.roleAccesses, { 
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'accessId' })
    access: Access
    
}

