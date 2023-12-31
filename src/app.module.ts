import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { AuthModule } from "./core/auth/auth.module";
import { DatabaseModule } from "./core/databases/database.module";
import { AbilitiesModule } from "./modules/abilities/abilities.module";
import { RolesModule } from "./modules/roles/roles.module";
import { UserAbilitiesModule } from "./modules/user-abilities/user-abilities.module";
import { UsersModule } from "./modules/users/users.module";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, cache: true }),
        EventEmitterModule.forRoot({ global: true }),
        DatabaseModule,
        RolesModule,
        AbilitiesModule,
        UsersModule,
        UserAbilitiesModule,
        AuthModule,
    ],
})
export class AppModule {}
