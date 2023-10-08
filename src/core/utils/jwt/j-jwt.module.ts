import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { JJwtService } from "./j-jwt.service";

@Module({
    imports: [JwtModule],
    providers: [JJwtService],
    exports: [JJwtService],
})
export class JJwtModule {}
