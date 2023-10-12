import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, Repository } from "typeorm";
import { EntityForbiddenException } from "../../core/common/exceptions/entity.forbidden.exception";
import { AbilitySaveEvent } from "./constants/ability.event";
import { CreateAbilityDto } from "./dto/create-ability.dto";
import { UpdateAbilityDto } from "./dto/update-ability.dto";
import { Ability } from "./entities/ability.entity";

@Injectable()
export class AbilitiesService {
    constructor(
        @InjectRepository(Ability)
        private readonly repository: Repository<Ability>,
        private readonly eventEmitter: EventEmitter2
    ) {}
    async create(createAbilityDto: CreateAbilityDto) {
        await this.isUnique(createAbilityDto.name);
        const ability = this.repository.create(createAbilityDto);
        this.eventEmitter.emit(AbilitySaveEvent, ability);
        return ability;
    }

    findAll() {
        return `This action returns all abilities`;
    }

    findOne(options: FindOneOptions<Ability>): Promise<Ability> {
        return this.repository.findOne(options);
    }

    update(id: number, updateAbilityDto: UpdateAbilityDto) {
        return `This action updates a #${id} ability`;
    }

    remove(id: number) {
        return `This action removes a #${id} ability`;
    }

    async isUnique(name: string) {
        const ability = await this.findOne({ where: { name } });
        if (ability) throw new EntityForbiddenException("Ability", name);
        return true;
    }
}
