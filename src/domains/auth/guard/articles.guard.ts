import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { UnauthorizedException } from "@nestjs/common/exceptions/unauthorized.exception";
import { ArticleService } from "src/domains/article/article.service";

@Injectable()
export class ArticleGuard implements CanActivate {

    constructor(private articleService: ArticleService) {}


  async canActivate(context: ExecutionContext) {

    const req = context.switchToHttp().getRequest();
    const user = req.user;
    const articleId = req.params.id;
    const accessList = user.userAccesses.map(access => access.name);
    const roleList = user.userRoles.map(role => role.name);


    if(roleList.indexOf('SystemAdmin')!=-1) return true;

    switch(req.method){
      case 'POST':
        if(accessList.indexOf('ArticleStore')!=-1){
          return true
        }
        else throw new UnauthorizedException("ArticleStore access is required");

      case 'PUT':
        
        if(accessList.indexOf('ArticleAdminUpdate')!=-1 ||
        (accessList.indexOf('ArticleOwnerUpdate')!=-1 && 
        (await this.articleService.getById(articleId)).userId == user.id)){
          return true
        } else throw new UnauthorizedException("You dont have permission to this article");

    }

    return false
  }

}