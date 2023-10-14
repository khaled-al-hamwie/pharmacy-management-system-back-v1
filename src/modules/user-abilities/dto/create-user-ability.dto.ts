import { Transform } from "class-transformer";
import { IsUUID } from "class-validator";

export class CreateUserAbilityDto {
    @IsUUID()
    @Transform(({ value }) => value.toString())
    user_id: string;

    @IsUUID()
    @Transform(({ value }) => value.toString())
    ability_id: string;
}
