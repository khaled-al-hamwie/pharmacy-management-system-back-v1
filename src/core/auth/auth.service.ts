import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "../../modules/users/dto/create-user.dto";
import { UsersService } from "../../modules/users/users.service";
import { JJwtService } from "../utils/jwt/j-jwt.service";

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jJwtService: JJwtService
    ) {}
    async register(createAuthDto: CreateUserDto) {
        const user = await this.usersService.create(createAuthDto);
        const payload = { sub: user.user_id, role: user.role };
        return this.jJwtService.signToken(payload);
    }
}
