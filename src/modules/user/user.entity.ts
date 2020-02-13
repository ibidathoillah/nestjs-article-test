import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Unique, OneToMany } from "typeorm";
import { Book } from "../book/book.entity";
import { Transform, Exclude } from "class-transformer";
import * as dayjs from "dayjs";

@Entity({
    name: 'users'
})
@Unique(['username'])
export class User extends BaseEntity {

    @PrimaryGeneratedColumn({
        type: 'bigint'
    })
    id: number

    @Column('varchar')
    username: string

    @Exclude()
    @Column({
        type: 'varchar'
    })
    password: string

    @OneToMany(type => Book, book => book.user)
    books: Book[]

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