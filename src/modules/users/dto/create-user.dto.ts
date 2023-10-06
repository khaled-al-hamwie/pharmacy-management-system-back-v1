import { Transform } from "class-transformer";
import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUUID,
    Length,
} from "class-validator";

export class CreateUserDto {
    // @IsUUID()
    // @Transform(({ value }) => value.toString())
    // role_id: string;

    @IsString()
    @IsNotEmpty()
    @Length(8, 45)
    user_name: string;

    @IsString()
    @IsNotEmpty()
    @Length(3, 45)
    first_name: string;

    @IsString()
    @IsNotEmpty()
    @Length(3, 45)
    last_name: string;

    @IsOptional()
    pic?: string;

    @IsEmail()
    @Length(1, 255)
    email: string;

    @IsString()
    @IsNotEmpty()
    @Length(8, 50)
    password: string;
}
