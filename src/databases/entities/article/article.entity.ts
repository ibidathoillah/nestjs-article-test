import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, UpdateDateColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Transform } from 'class-transformer';
import * as dayjs from 'dayjs';
import { User } from '../user/user.entity';

@Entity({ 
    name: 'articles'
})
export class Article extends BaseEntity {

    @PrimaryGeneratedColumn({
        type: 'int'
    })
    id: number

    @Column({
        type: 'varchar',
        length: 200
    })
    title: string

    @Column({
        type: 'text'
    })
    body: string

    @Column({
        type: 'int'
    })
    userId: number

    @ManyToOne(() => User, user => user.articles, { 
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'userId' })
    user: User

    @Transform(date => dayjs(date).format('YYYY-MM-DD HH:mm:ss'))
    @CreateDateColumn({
        type: 'timestamp'
    })
    createdAt: string

    @Transform(date => dayjs(date).format('YYYY-MM-DD HH:mm:ss'))
    @UpdateDateColumn({
        type: 'timestamp'
    })
    updatedAt: string

}

