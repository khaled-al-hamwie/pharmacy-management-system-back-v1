import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from "@nestjs/common";
import { EntityNotFoundException } from "../../core/common/exceptions/entity.not-found.exception";
import { AbilitiesService } from "./abilities.service";
import { CreateAbilityDto } from "./dto/create-ability.dto";
import { UpdateAbilityDto } from "./dto/update-ability.dto";
import { Ability } from "./entities/ability.entity";

@Controller("abilities")
export class AbilitiesController {
    constructor(private readonly abilitiesService: AbilitiesService) {}

    @Post()
    create(@Body() createAbilityDto: CreateAbilityDto) {
        return this.abilitiesService.create(createAbilityDto);
    }

    @Get()
    async findAll() {
        const abilities: Ability[] = await this.abilitiesService.findAll({});
        if (abilities.length == 0) throw new EntityNotFoundException("Ability");
        return abilities;
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.abilitiesService.findById(id);
    }

    @Patch(":id")
    async update(@Param("id") id: string, @Body() updateDto: UpdateAbilityDto) {
        const ability = await this.abilitiesService.findById(id);
        return this.abilitiesService.update(ability, updateDto);
    }

    @Delete(":id")
    async remove(@Param("id") id: string) {
        const ability = await this.abilitiesService.findById(id);
        return this.abilitiesService.remove(ability);
    }
}
