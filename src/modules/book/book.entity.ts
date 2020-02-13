import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, UpdateDateColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Transform } from 'class-transformer';
import * as dayjs from 'dayjs';
import { User } from '../user/user.entity';

@Entity({ 
    name: 'books'
})
export class Book extends BaseEntity {

    @PrimaryGeneratedColumn({
        type: 'bigint'
    })
    id: number

    @Column({
        type: 'varchar',
        length: 200
    })
    name: string

    @Column({
        type: 'text'
    })
    description: string

    @Column({
        type: 'boolean',
        default: false
    })
    is_published: boolean

    @ManyToOne(type => User, user => user.books, { 
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'user_id' })
    user: User

    @Transform(date => dayjs(date).format('YYYY-MM-DD HH:mm:ss'))
    @CreateDateColumn({
        type: 'timestamp'
    })
    created_at: string

    @Transform(date => dayjs(date).format('YYYY-MM-DD HH:mm:ss'))
    @UpdateDateColumn({
        type: 'timestamp'
    })
    updated_at: string

}

