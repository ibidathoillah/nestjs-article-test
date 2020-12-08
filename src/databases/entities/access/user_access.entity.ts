import { Entity, BaseEntity, PrimaryGeneratedColumn, JoinColumn, ManyToOne, Column } from 'typeorm';
import { User } from '../user/user.entity';
import { Access } from './access.entity';

@Entity({ 
    name: 'user_access'
})
export class UserAccess extends BaseEntity {

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
    accessId: number

    @ManyToOne(() => User, user => user.userAccesses, { 
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'userId' })
    user: User

    @ManyToOne(() => Access, access => access.userAccesses, { 
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'accessId' })
    access: Access
    
}

