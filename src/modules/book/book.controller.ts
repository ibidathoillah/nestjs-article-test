import { Controller, Get, Param, ParseIntPipe, Post, Body, Put, UsePipes, Delete, Query, UseInterceptors, ClassSerializerInterceptor, UseGuards, Req } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDTO } from './dto/create-book.dto';
import { StatusBookDTO } from './dto/status-book.dto';
import { Validation } from 'src/config/validation.pipe';
import { FilterBookDTO } from './dto/filter-book.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@UsePipes(Validation)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('books')
export class BookController {

    constructor(
        private BookService: BookService
    ) {}

    @Get()
    getAll(@Query() query: FilterBookDTO, @Req() req) {
        console.log(req.user)
        let books =  this.BookService.getAll(query)
        return books
    }

    @Get(':id')
    getById(@Param('id', ParseIntPipe) id: number) {
        return this.BookService.getById(id)
    }
    
    @Post()
    createBook(@Body() newBook: CreateBookDTO) {
        return this.BookService.createBook(newBook)
    }

    @Put(':id')
    updateBook(
        @Param('id', ParseIntPipe) id: number, 
        @Body() updateBook: CreateBookDTO
    ) {
        return this.BookService.updateBook(id, updateBook)
    }

    @Put(':id/status')
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
