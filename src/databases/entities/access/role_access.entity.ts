import { Entity, BaseEntity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
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

