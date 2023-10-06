import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, Repository } from "typeorm";
import { RoleSaveEvent } from "./constants/role.event";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { Role } from "./entities/role.entity";
import { RoleForbiddenException } from "./exceptions/role.forbidden.exception";

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Role) private readonly repository: Repository<Role>,
        private readonly eventEmitter: EventEmitter2
    ) {}
    async create(createRoleDto: CreateRoleDto) {
        await this.isUnique(createRoleDto.name);
        const role = this.repository.create(createRoleDto);
        this.eventEmitter.emit(RoleSaveEvent, role);
        return role;
    }

    findAll() {
        return `This action returns all roles`;
    }

    findOne(options: FindOneOptions<Role>) {
        return this.repository.findOne(options);
    }

    update(id: number, updateRoleDto: UpdateRoleDto) {
        return `This action updates a #${id} role`;
    }

    remove(id: number) {
        return `This action removes a #${id} role`;
    }

    async isUnique(name: string) {
        const role = await this.findOne({ where: { name } });
        if (role) throw new RoleForbiddenException(name);
        return true;
    }
}
