import { Module } from "@nestjs/common";
import { TypeormModule } from "./mysql/typeorm.module";

@Module({ imports: [TypeormModule.register()] })
export class DatabaseModule {}
