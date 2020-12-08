import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Unique, OneToMany } from "typeorm";
import { Transform, Exclude } from "class-transformer";
import * as dayjs from "dayjs";
import { Article } from "../article/article.entity";
import { UserRole } from "../role/user_role.entity";
import { RoleAccess } from "../access/role_access.entity";
import { UserAccess } from "../access/user_access.entity";

@Entity({
    name: 'users'
})
@Unique(['email'])
export class User extends BaseEntity {

    @PrimaryGeneratedColumn({
        type: 'int'
    })
    id: number

    @Column({ type: 'varchar', length: 255 })
    fullName: string

    @Column({ type: 'varchar', length: 255 })
    email: string

    @Exclude()
    @Column({ type: 'varchar', length: 255 })
    password: string

    @Column({ type: 'varchar', length: 255 })
    gender: string

    @OneToMany(() => Article, article => article.user)
    articles: Article[]

    @OneToMany(() => UserRole, userRoles => userRoles.user)
    userRoles: UserRole[]

    @OneToMany(() => UserAccess, userAccess => userAccess.user)
    userAccesses: UserAccess[]

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