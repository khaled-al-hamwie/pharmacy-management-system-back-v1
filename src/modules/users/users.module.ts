import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CryptographModule } from "../../core/utils/cryptograph/cryptograph.module";
import { RolesModule } from "../roles/roles.module";
import { User } from "./entities/user.entity";
import { UsersListener } from "./listeners/users.listener";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
    imports: [TypeOrmModule.forFeature([User]), RolesModule, CryptographModule],
    controllers: [UsersController],
    providers: [UsersService, UsersListener],
})
export class UsersModule {}
