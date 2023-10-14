import { Body, Controller, Delete, Param, Put } from "@nestjs/common";
import { CreateUserAbilityDto } from "./dto/create-user-ability.dto";
import { UserAbilitiesService } from "./user-abilities.service";

@Controller("user-abilities")
export class UserAbilitiesController {
    constructor(private readonly userAbilitiesService: UserAbilitiesService) {}

    @Put()
    async create(@Body() createDto: CreateUserAbilityDto) {
        return this.userAbilitiesService.create(createDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.userAbilitiesService.remove(+id);
    }
}
