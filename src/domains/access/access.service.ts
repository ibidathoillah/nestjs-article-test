import { Injectable, NotFoundException } from '@nestjs/common';
import { AccessRepository } from './access.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Access } from '../../databases/entities/access/access.entity';
import { In } from 'typeorm';

@Injectable()
export class AccessService {

    constructor(
        @InjectRepository(AccessRepository, 'postgres')
        private accessesRepository: AccessRepository
    ) {}
    
    async getByIds(ids: number[]): Promise<Access[]> {
        return ids.length > 0 ? await this.accessesRepository.find({ where: { id: In(ids) }}) : []
    }

    async getByName(name: string): Promise<Access> {
        const access = await this.accessesRepository.findOne({name:name})
        if (!access) throw new NotFoundException('access not found')
        return access
    }
    
}
