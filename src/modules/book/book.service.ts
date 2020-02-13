import { Injectable, NotFoundException } from '@nestjs/common';
import { BookRepository } from './book.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { CreateBookDTO } from './dto/create-book.dto';
import { FilterBookDTO } from './dto/filter-book.dto';

@Injectable()
export class BookService {

    constructor(
        @InjectRepository(BookRepository, 'postgres')
        private booksRepository: BookRepository
    ) {}
    
    async getById(id: number): Promise<Book> {
        const book = await this.booksRepository.findOne(id)
        if (!book) throw new NotFoundException('book not found')
        return book
    }

    async getAll(filter: FilterBookDTO): Promise<any[]> {
        // const query = this.booksRepository.createQueryBuilder()

        // if (filter.is_published) {
        //     query.andWhere('is_published = :status', { status: filter.is_published })
        // }

        // return await query.getMany()
        const books = await this.booksRepository.find({
            join: {
                alias: 'book',
                leftJoinAndSelect: {
                    user: 'book.user'
                }
            },
            where: qb => {
                qb.where({ is_published: true })
                qb.andWhere('user.username ilike :name', { name: '%nuns%' })
            },
            
        })
        return books
    }

    async createBook(newBook: CreateBookDTO): Promise<Book> {
        const book = await this.booksRepository.save(newBook)
        return book
    }

    async updateBook(id: number, updateBook: CreateBookDTO): Promise<Book> {
        const book = await this.getById(id)
        await this.booksRepository.update(book.id, updateBook)
        return await this.getById(book.id)
    }

    async updatePublishedBook(id: number, status: boolean): Promise<Book> {
        const book = await this.getById(id)
        await this.booksRepository.update(book.id, { is_published: status })
        return await this.getById(book.id)
    }

    async deleteBook(id: number): Promise<string> {
        const book = await this.getById(id)
        await this.booksRepository.delete(book.id)
        return 'deleted'
    }
    
}
