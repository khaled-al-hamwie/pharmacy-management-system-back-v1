import { Transform } from "class-transformer";
import {
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUUID,
    Length,
} from "class-validator";

export class CreateAbilityDto {
    @IsUUID()
    @Transform(({ value }) => value.toString())
    role_id: string;

    @IsString()
    @IsNotEmpty()
    @Length(3, 45)
    name: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @Length(3, 500)
    describtion: string;
}
