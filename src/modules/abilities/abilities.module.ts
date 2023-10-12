import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AbilitiesController } from "./abilities.controller";
import { AbilitiesService } from "./abilities.service";
import { Ability } from "./entities/ability.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Ability])],
    controllers: [AbilitiesController],
    providers: [AbilitiesService],
})
export class AbilitiesModule {}
