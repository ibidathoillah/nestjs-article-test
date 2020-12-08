import { Entity, BaseEntity, JoinTable, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { Role } from './role.entity';

@Entity({ 
    name: 'user_roles'
})
export class UserRole extends BaseEntity {

    @PrimaryGeneratedColumn({
        type: 'int'
    })
    id: number

    @Column({
        type: 'int',
    })
    userId: number

    @Column({
        type: 'int',
    })
    roleId: number

    @ManyToOne(() => User, user => user.userRoles, { 
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'userId' })
    user: User

    @ManyToOne(() => Role, role => role.userRoles, { 
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'roleId' })
    role: Role
    
}

