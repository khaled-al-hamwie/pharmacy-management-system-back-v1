import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from "@nestjs/common";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { Role } from "./entities/role.entity";
import { RoleNotFoundException } from "./exceptions/role.not-found.exception";
import { RolesService } from "./roles.service";

@Controller("roles")
export class RolesController {
    constructor(private readonly rolesService: RolesService) {}

    @Post()
    create(@Body() createRoleDto: CreateRoleDto) {
        return this.rolesService.create(createRoleDto);
    }

    @Get()
    async findAll() {
        const roles: Role[] = await this.rolesService.findAll({});
        if (roles.length == 0) throw new RoleNotFoundException();
        return roles;
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.rolesService.findOne({});
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() updateRoleDto: UpdateRoleDto) {
        return this.rolesService.update(+id, updateRoleDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.rolesService.remove(+id);
    }
}
