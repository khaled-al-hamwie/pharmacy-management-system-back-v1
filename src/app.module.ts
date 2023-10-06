import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "./core/databases/database.module";
import { UsersModule } from './modules/users/users.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, cache: true }),
        DatabaseModule,
        UsersModule,
    ],
})
export class AppModule {}
