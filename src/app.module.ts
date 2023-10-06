import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "./core/databases/database.module";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, cache: true }),
        DatabaseModule,
    ],
})
export class AppModule {}
