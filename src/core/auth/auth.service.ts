import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "../../modules/users/dto/create-user.dto";
import { LoginUserDto } from "../../modules/users/dto/login-user.dto";
import { UsersService } from "../../modules/users/users.service";
import { CryptographService } from "../utils/cryptograph/cryptograph.service";
import { JJwtService } from "../utils/jwt/j-jwt.service";
import { CredentailsDontMatchException } from "./exceptions/credentails-dont-match.exception";
import { PayloadInterface } from "./interfaces/payload.interface";

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jJwtService: JJwtService,
        private readonly cryptographService: CryptographService
    ) {}
    async register(createAuthDto: CreateUserDto) {
        const { first_name, last_name, email } = await this.usersService.create(
            createAuthDto
        );
        return { first_name, last_name, email };
    }

    async login({ email, password }: LoginUserDto) {
        const user = await this.checkEmail(email);
        await this.checkPassword(password, user.password);
        const payload: PayloadInterface = {
            sub: user.user_id,
            role: user.role,
        };
        return this.jJwtService.signToken(payload);
    }

    async checkEmail(email: string) {
        const user = await this.usersService.findOne({
            where: { email: email },
        });
        if (!user) throw new CredentailsDontMatchException();
        return user;
    }

    async checkPassword(password: string, hashed: string): Promise<boolean> {
        const is_valid = await this.cryptographService.compare(
            password,
            hashed
        );
        if (!is_valid) throw new CredentailsDontMatchException();
        return is_valid;
    }
}
