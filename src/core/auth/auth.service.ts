import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "../../modules/users/dto/create-user.dto";
import { UsersService } from "../../modules/users/users.service";
import { JJwtService } from "../utils/jwt/j-jwt.service";
import { PayloadInterface } from "./interfaces/payload.interface";

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jJwtService: JJwtService
    ) {}
    async register(createAuthDto: CreateUserDto) {
        const { first_name, last_name, email } = await this.usersService.create(
            createAuthDto
        );
        return { first_name, last_name, email };
    }
}
