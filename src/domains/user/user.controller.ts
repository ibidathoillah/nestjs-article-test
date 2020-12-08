import { Controller, Get, Body, HttpCode, UsePipes, Param, ParseIntPipe, UseInterceptors, ClassSerializerInterceptor, Query, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Validation } from 'src/config/validation.pipe';
import { GrantAccessUserDto } from './dto/grant-access';
import { AuthGuard } from '@nestjs/passport';
import { UserGuard } from '../auth/guard/users.guard';



@UseGuards(AuthGuard('jwt'), UserGuard)
@Controller('users')
export class UserController {

    constructor(
        private userService: UserService
    ) {}

    @Get()
    @UseInterceptors(ClassSerializerInterceptor)
    getAllUser() {
        return this.userService.getAllUser()
    }

    @Get(':id')
    @UseInterceptors(ClassSerializerInterceptor)
    getById(@Param('id', ParseIntPipe) id: number) {
        return this.userService.getUserDetails(id)
    }

   
    @Put(':id/grant-access') 
    @UseInterceptors(ClassSerializerInterceptor)
    @UsePipes(Validation)
    grantAccess(@Body() payload: GrantAccessUserDto, @Param('id', ParseIntPipe) id: number) {
        return this.userService.grantAccess(payload, id)
    }

}
