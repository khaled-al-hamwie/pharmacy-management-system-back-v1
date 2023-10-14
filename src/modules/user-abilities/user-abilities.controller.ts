import { Body, Controller, Delete, Param, Put } from "@nestjs/common";
import { AbilitiesService } from "../abilities/abilities.service";
import { UsersService } from "../users/users.service";
import { CreateUserAbilityDto } from "./dto/create-user-ability.dto";
import { UserAbilitiesService } from "./user-abilities.service";

@Controller("user-abilities")
export class UserAbilitiesController {
    constructor(
        private readonly userAbilitiesService: UserAbilitiesService,
        private readonly usersService: UsersService,
        private readonly abilitiesService: AbilitiesService
    ) {}

    @Put()
    async create(@Body() createDto: CreateUserAbilityDto) {
        createDto.ability = await this.abilitiesService.findById(
            createDto.ability_id
        );
        createDto.user = await this.usersService.findById(createDto.user_id);
        delete createDto.ability_id;
        delete createDto.user_id;
        return this.userAbilitiesService.create(createDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.userAbilitiesService.remove(+id);
    }
}
