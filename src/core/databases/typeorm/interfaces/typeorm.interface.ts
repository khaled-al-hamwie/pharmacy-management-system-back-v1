import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export interface TypeormInterface {
    development: TypeOrmModuleOptions;
    test: TypeOrmModuleOptions;
    production: TypeOrmModuleOptions;
}
