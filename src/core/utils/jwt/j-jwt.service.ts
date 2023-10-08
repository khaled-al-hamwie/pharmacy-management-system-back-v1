import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JJwtService {
    constructor(
        private jwtService: JwtService,
        private configService: ConfigService
    ) {}

    signToken(payload: any) {
        const option = {
            secret: this.configService.get("JWTKEY"),
            expiresIn: this.configService.get("TOKEN_EXPIRATION"),
        };
        return {
            access_token: this.jwtService.sign(payload, option),
        };
    }
}
