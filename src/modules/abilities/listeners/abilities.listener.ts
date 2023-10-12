import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AbilitySaveEvent } from "../constants/ability.event";
import { Ability } from "../entities/ability.entity";

@Injectable()
export class AbilitysListener {
    constructor(
        @InjectRepository(Ability)
        private readonly repository: Repository<Ability>
    ) {}

    @OnEvent(AbilitySaveEvent, { async: true })
    async save(payload: Ability) {
        await this.repository.save(payload);
    }
}
