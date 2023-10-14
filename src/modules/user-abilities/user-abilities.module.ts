import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AbilitiesModule } from "../abilities/abilities.module";
import { UsersModule } from "../users/users.module";
import { UserAbility } from "./entities/user-ability.entity";
import { UserAbilitiesController } from "./user-abilities.controller";
import { UserAbilitiesService } from "./user-abilities.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserAbility]),
        UsersModule,
        AbilitiesModule,
    ],
    controllers: [UserAbilitiesController],
    providers: [UserAbilitiesService],
})
export class UserAbilitiesModule {}
