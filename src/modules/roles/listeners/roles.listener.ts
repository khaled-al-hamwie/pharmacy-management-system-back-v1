import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RoleSaveEvent } from "../constants/role.event";
import { Role } from "../entities/role.entity";

@Injectable()
export class RolesListener {
    constructor(
        @InjectRepository(Role) private readonly repository: Repository<Role>
    ) {}

    @OnEvent(RoleSaveEvent, { async: true })
    async save(payload: Role) {
        await this.repository.save(payload);
    }
}
