import { Controller, Get, Param, ParseIntPipe, Post, Body, Put, UsePipes, Delete, Query, UseInterceptors, ClassSerializerInterceptor, UseGuards, Req } from '@nestjs/common';
import { AccessService } from './access.service';
import { CreateAccessDTO } from './dto/create-access.dto';
import { Validation } from 'src/config/validation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { Access } from 'src/databases/entities/access/access.entity';

@UseGuards(AuthGuard('jwt'))
@UsePipes(Validation)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('accesses')
export class AccessController {

    constructor(
        private accessService: AccessService
    ) {}

    @Get()
    getAll(@Req() req) {
        let accesses =  this.accessService.getAllAccess()
        return accesses
    }

}
