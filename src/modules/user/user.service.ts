import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { CollectUserDto } from './dto/collect-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateBookDTO } from '../book/dto/create-book.dto';
import { Book } from '../book/book.entity';
import { User } from './user.entity';
import { BookRepository } from '../book/book.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserRepository, 'postgres')
        private userRepository: UserRepository,

        @InjectRepository(BookRepository, 'postgres')
        private booksRepository: BookRepository
    ) {}

    async createUser(newUser: CreateUserDto): Promise<CollectUserDto> {
        const existsUsername = await this.userRepository.findOne({ username: newUser.username })

        if (existsUsername) throw new ConflictException('duplicate username')

        const salt = await bcrypt.genSalt()
        newUser.password = await bcrypt.hash(newUser.password, salt)
        const user = await this.userRepository.save(newUser)
        
        return await this.getById(user.id)
    }

    async collectUser(): Promise<CollectUserDto[]> {
        const users = await this.userRepository.find()
        return users
    }

    async getById(id: number): Promise<User> {
        const user = await this.userRepository.findOne(id)
        if (!user) throw new NotFoundException('user not found')
        return user
    }

    async createBook(id: number, newBook: CreateBookDTO): Promise<Book> {
        const user = await this.getById(id)
        const book = await this.booksRepository.saveWithUser(newBook, user)
        return await this.booksRepository.findOne(book.id)
    }

    async getBook(id: number): Promise<Book[]> {
        const user = await this.getById(id)
        const books = await this.booksRepository.find({
            where: {
                user
            }
        })
        return books
    }

    async getBookById(id: number, bookId: number): Promise<Book> {
        const user = await this.getById(id)
        const book = await this.booksRepository.findOne({
            where: {
                user,
                id: bookId
            }
        })

        if (!book) throw new NotFoundException('book not found')

        return book
    }


}
