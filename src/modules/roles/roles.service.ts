import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, FindOneOptions, Repository } from "typeorm";
import { RoleSaveEvent } from "./constants/role.event";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { Role } from "./entities/role.entity";
import { RoleForbiddenException } from "./exceptions/role.forbidden.exception";
import { RoleNotFoundException } from "./exceptions/role.not-found.exception";

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Role) private readonly repository: Repository<Role>,
        private readonly eventEmitter: EventEmitter2
    ) {}
    async create(createRoleDto: CreateRoleDto): Promise<Role> {
        await this.isUnique(createRoleDto.name);
        const role = this.repository.create(createRoleDto);
        this.eventEmitter.emit(RoleSaveEvent, role);
        return role;
    }

    findAll(options: FindManyOptions<Role>): Promise<Role[]> {
        return this.repository.find(options);
    }

    findOne(options: FindOneOptions<Role>): Promise<Role> {
        return this.repository.findOne(options);
    }

    async findById(role_id: string) {
        const role = await this.findOne({ where: { role_id } });
        if (!role) throw new RoleNotFoundException();
        return role;
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
