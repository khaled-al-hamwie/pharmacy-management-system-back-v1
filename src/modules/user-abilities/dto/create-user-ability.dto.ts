import { Transform } from "class-transformer";
import { IsUUID } from "class-validator";
import { Ability } from "../../abilities/entities/ability.entity";
import { User } from "../../users/entities/user.entity";

export class CreateUserAbilityDto {
    @IsUUID()
    @Transform(({ value }) => value.toString())
    user_id: string;

    @IsUUID()
    @Transform(({ value }) => value.toString())
    ability_id: string;

    user: User;
    ability: Ability;
}
