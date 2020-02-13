import { Controller, Get, Body, Post, UsePipes, Param, ParseIntPipe, UseInterceptors, ClassSerializerInterceptor, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Validation } from 'src/config/validation.pipe';
import { CreateBookDTO } from '../book/dto/create-book.dto';
import { Book } from '../book/book.entity';

@Controller('users')
export class UserController {

    constructor(
        private userService: UserService
    ) {}

    @Get()
    @UseInterceptors(ClassSerializerInterceptor)
    collectUser() {
        return this.userService.collectUser()
    }

    @Post()
    @UseInterceptors(ClassSerializerInterceptor)
    @UsePipes(Validation)
    createUser(@Body() newUser: CreateUserDto) {
        return this.userService.createUser(newUser)
    }

    @Get(':id')
    @UseInterceptors(ClassSerializerInterceptor)
    getById(@Param('id', ParseIntPipe) id: number) {
        return this.userService.getById(id)
    }

    @Post(':id/books')
    @UsePipes(Validation)
    @UseInterceptors(ClassSerializerInterceptor)
    createBook(
        @Param('id', ParseIntPipe) id: number,
        @Body() newBook: CreateBookDTO
    ): Promise<Book> {
        return this.userService.createBook(id, newBook)       
    }

    @Get(':id/books')
    getBook(@Param('id', ParseIntPipe) id: number) {
        return this.userService.getBook(id)
    }

    @Get(':id/books/:bookId')
    getBookById(@Param('id', ParseIntPipe) id: number, @Param('bookId', ParseIntPipe) bookId: number) {
        return this.userService.getBookById(id, bookId)
    }
}
