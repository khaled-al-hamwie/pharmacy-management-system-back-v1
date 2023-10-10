import { Module } from "@nestjs/common";
import { UsersModule } from "../../modules/users/users.module";
import { CryptographModule } from "../utils/cryptograph/cryptograph.module";
import { JJwtModule } from "../utils/jwt/j-jwt.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
    imports: [UsersModule, JJwtModule, CryptographModule],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
