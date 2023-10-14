import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AbilitiesService } from "../abilities/abilities.service";
import { UsersService } from "../users/users.service";
import { CreateUserAbilityDto } from "./dto/create-user-ability.dto";
import { UserAbility } from "./entities/user-ability.entity";

@Injectable()
export class UserAbilitiesService {
    constructor(
        @InjectRepository(UserAbility)
        private readonly repository: Repository<UserAbility>,
        private readonly usersService: UsersService,
        private readonly abilitiesService: AbilitiesService
    ) {}
    async create(createDto: CreateUserAbilityDto) {
        const ability = await this.abilitiesService.findById(
            createDto.ability_id
        );
        const user = await this.usersService.findById(createDto.user_id);
        const user_ability = this.repository.create({ user, ability });
        return user_ability;
    }

    findAll() {
        return `This action returns all userAbilities`;
    }

    findOne(id: number) {
        return `This action returns a #${id} userAbility`;
    }

    remove(id: number) {
        return `This action removes a #${id} userAbility`;
    }
}
