import { Controller, Get, HttpCode, Param, ParseIntPipe, Post, Body, Put, UsePipes, Delete, Query, UseInterceptors, ClassSerializerInterceptor, UseGuards, Req } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDTO } from './dto/create-article.dto';
import { Validation } from 'src/config/validation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { ArticleGuard } from '../auth/guard/articles.guard';

@UsePipes(Validation)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('articles')
export class ArticleController {

    constructor(
        private ArticleService: ArticleService
    ) {}

    @Get()
    getAll(@Req() req) {
        let articles =  this.ArticleService.getAll()
        return articles
    }

    @Get(':id')
    getById(@Param('id', ParseIntPipe) id: number) {
        return this.ArticleService.getById(id)
    }
    
    @UseGuards(AuthGuard('jwt'), ArticleGuard)
    @Post()
    createArticle(@Req() req, @Body() newArticle: CreateArticleDTO) {
        newArticle.userId = req.user.id;

        return this.ArticleService.createArticle(newArticle)
    }

    @UseGuards(AuthGuard('jwt'), ArticleGuard)
    @Put(':id')
    @HttpCode(204)
    updateArticle(
        @Param('id', ParseIntPipe) id: number, 
        @Body() updateArticle: CreateArticleDTO
    ) {
        return this.ArticleService.updateArticle(id, updateArticle)
    }

    @UseGuards(AuthGuard('jwt'), ArticleGuard)
    @Delete(':id')
    deleteArticle(@Param('id', ParseIntPipe) id: number) {
        return this.ArticleService.deleteArticle(id)
    }
}
