import { EntityRepository, Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDTO } from './dto/create-book.dto';
import { User } from '../user/user.entity';

@EntityRepository(Book)
export class BookRepository extends Repository<Book> {

    async saveWithUser(newBook: CreateBookDTO, user: User): Promise<Book> {
        newBook = { ...newBook, ...{ user: user }}
        return await this.save(newBook)
    }
}