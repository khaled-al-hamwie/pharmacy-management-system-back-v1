import { Transform } from "class-transformer";
import { IsOptional, IsString, Length } from "class-validator";

export class CreateRoleDto {
    @Transform(({ value }) => String(value).trim().toLocaleLowerCase())
    @IsString()
    @Length(3, 45)
    name: string;

    @IsOptional()
    @IsString()
    @Length(3, 255)
    description?: string;
}
