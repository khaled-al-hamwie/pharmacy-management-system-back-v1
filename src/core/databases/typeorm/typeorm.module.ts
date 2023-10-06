import { DynamicModule, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeormFactory } from "./typeorm.factory";

@Module({})
export class TypeormModule {
    static register(): DynamicModule {
        return {
            module: TypeormModule,
            imports: [
                TypeOrmModule.forRootAsync({
                    imports: [ConfigModule],
                    useFactory: TypeormFactory,
                    inject: [ConfigService],
                }),
            ],
        };
    }
}
