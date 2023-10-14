import { Injectable } from "@nestjs/common";
import { CreateUserAbilityDto } from "./dto/create-user-ability.dto";

@Injectable()
export class UserAbilitiesService {
    create(createUserAbilityDto: CreateUserAbilityDto) {
        return "This action adds a new userAbility";
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
