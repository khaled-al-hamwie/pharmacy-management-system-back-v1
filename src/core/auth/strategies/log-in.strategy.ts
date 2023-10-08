import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "../../../modules/users/users.service";
import { LoggedInStragegy } from "../../constants/strategy";
import { notLogInException } from "../exceptions/not-log-in.exception";
import { PayloadInterface } from "../interfaces/payload.interface";

@Injectable()
export default class LogInStrategy extends PassportStrategy(
    Strategy,
    LoggedInStragegy
) {
    constructor(private readonly usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWTKEY,
        });
    }

    async validate(payload: PayloadInterface) {
        const id = payload.sub;
        if (!id) {
            throw new notLogInException();
        }
        const user = await this.usersService.findOne({
            where: { user_id: payload.sub },
        });
        if (!user) {
            throw new notLogInException();
        }
        return {
            sub: payload.sub,
            role: payload.role,
        };
    }
}
