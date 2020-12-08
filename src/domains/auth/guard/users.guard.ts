import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { UnauthorizedException } from "@nestjs/common/exceptions/unauthorized.exception";
import { Observable } from "rxjs";

@Injectable()
export class UserGuard implements CanActivate {

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    
    if(user.userRoles.filter(role => role.access.name === 'SystemAdmin').length > 0){
      return true
    }

    throw new UnauthorizedException("Only SystemAdmin role can access this");
  }

}