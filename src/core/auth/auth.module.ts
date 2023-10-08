import { Module } from "@nestjs/common";
import { UsersModule } from "../../modules/users/users.module";
import { JJwtModule } from "../utils/jwt/j-jwt.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
    imports: [UsersModule, JJwtModule],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
