import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseEntity } from '../entity/base.entity';
import { Repository, DeepPartial } from 'typeorm';
import { classToPlain } from 'class-transformer';

@Injectable()
export class GenericService<T extends BaseEntity<T>> {
    constructor(
        protected repository: Repository<T>,
    ) { }

    findAll(): Promise<T[]> {
        return this.repository.find();
    }

    findOne(id: number): Promise<T> {
        return this.repository.findOne({ where: { id: id } } as any);
    }

    async create(t: any): Promise<any> {
        const partial: DeepPartial<T> = {
            ...t,
        };
        const entity = this.repository.create(partial);
        return classToPlain(await this.repository.save(entity));
    }

    async createMany(ts: T[]): Promise<any[]> {
        const partials: DeepPartial<T>[] = ts.map(t => ({ ...t }));
        const entities = this.repository.create(partials);
        const savedEntities = await this.repository.save(entities);

        return savedEntities.map(entity => classToPlain(entity));
    }
    async update(id: number, t: any): Promise<T> {
        console.log("updating", id, t);
        await this.repository.update(id, t);
        console.log("in findOne");
        if (id === undefined || id === null) {
            throw new Error("Invalid ID provided");
        }
        const entity = await this.repository.findOne({ where: { id: id } } as any);
        if (!entity) {
            throw new Error(`Entity with ID ${id} not found`);
        }
        return entity;
    }

    async remove(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}
