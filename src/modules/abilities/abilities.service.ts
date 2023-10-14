import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, FindOneOptions, Repository } from "typeorm";
import { EntityForbiddenException } from "../../core/common/exceptions/entity.forbidden.exception";
import { EntityNotFoundException } from "../../core/common/exceptions/entity.not-found.exception";
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

    findAll(options: FindManyOptions<Ability>): Promise<Ability[]> {
        return this.repository.find(options);
    }

    findOne(options: FindOneOptions<Ability>): Promise<Ability> {
        return this.repository.findOne(options);
    }

    async findById(id: string) {
        const ability = await this.findOne({
            where: { ability_id: id },
        });
        if (!ability) throw new EntityNotFoundException("Ability");
        return ability;
    }

    async update(ability: Ability, updateDto: UpdateAbilityDto) {
        if (updateDto.name) await this.isUnique(updateDto.name);
        Object.assign(ability, updateDto);
        this.eventEmitter.emit(AbilitySaveEvent, ability);
        return ability;
    }

    remove(ability: Ability) {
        this.repository.softRemove(ability);
        return { message: "ability has beend deleted succsesfully" };
    }

    async isUnique(name: string) {
        const ability = await this.findOne({
            where: { name },
            withDeleted: true,
        });
        if (ability) throw new EntityForbiddenException("Ability", name);
        return true;
    }
}
