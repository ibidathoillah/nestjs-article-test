import { Controller, Get, Param, ParseIntPipe, Post, Body, Put, UsePipes, Delete, Query, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDTO } from './dto/create-book.dto';
import { StatusBookDTO } from './dto/status-book.dto';
import { Validation } from 'src/config/validation.pipe';
import { FilterBookDTO } from './dto/filter-book.dto';

@Controller('books')
export class BookController {

    constructor(
        private BookService: BookService
    ) {}

    @Get()
    @UsePipes(Validation)
    @UseInterceptors(ClassSerializerInterceptor)
    getAll(@Query() query: FilterBookDTO) {
        let books =  this.BookService.getAll(query)
        return books
    }

    @Get(':id')
    @UseInterceptors(ClassSerializerInterceptor)
    getById(@Param('id', ParseIntPipe) id: number) {
        return this.BookService.getById(id)
    }
    
    @Post()
    @UsePipes(Validation)
    @UseInterceptors(ClassSerializerInterceptor)
    createBook(@Body() newBook: CreateBookDTO) {
        return this.BookService.createBook(newBook)
    }

    @Put(':id')
    @UseInterceptors(ClassSerializerInterceptor)
    @UsePipes(Validation)
    updateBook(
        @Param('id', ParseIntPipe) id: number, 
        @Body() updateBook: CreateBookDTO
    ) {
        return this.BookService.updateBook(id, updateBook)
    }

    @Put(':id/status')
    @UseInterceptors(ClassSerializerInterceptor)
    @UsePipes(Validation)
    updateBookStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body() statusBook: StatusBookDTO
    ) {
        return this.BookService.updatePublishedBook(id, statusBook.status)
    }

    @Delete(':id')
    deleteBook(@Param('id', ParseIntPipe) id: number) {
        return this.BookService.deleteBook(id)
    }
}
