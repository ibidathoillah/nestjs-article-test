import { EntityRepository, Repository } from 'typeorm';
import { Article } from '../../databases/entities/article/article.entity';
import { CreateArticleDTO } from './dto/create-article.dto';
import { User } from '../../databases/entities/user/user.entity';

@EntityRepository(Article)
export class ArticleRepository extends Repository<Article> {

    async saveWithUser(newArticle: CreateArticleDTO, user: User): Promise<Article> {
        newArticle = { ...newArticle, ...{ user: user }}
        return await this.save(newArticle)
    }
}