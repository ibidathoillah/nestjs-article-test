import { Injectable, NotFoundException } from '@nestjs/common';
import { RoleRepository } from './role.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../../databases/entities/role/role.entity';
import { In } from 'typeorm';

@Injectable()
export class RoleService {

    constructor(
        @InjectRepository(RoleRepository, 'postgres')
        private rolesRepository: RoleRepository,
    ) {}
    
    private async getById(id: number): Promise<Role> {
        const role = await this.rolesRepository.findOne(id)
        if (!role) throw new NotFoundException('role not found')
        return role
    }
        
    async getByIds(ids: number[]): Promise<Role[]> {
        return ids.length > 0 ? await this.rolesRepository.find({ where: { id: In(ids) }}) : []
    }
    
}
