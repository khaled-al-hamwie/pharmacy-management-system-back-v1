import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { DEVELOPMENT, PRODUCTION, TEST } from "../../constants/enviroment";
import { TypeormConfig } from "./config/typeorm.confing";

export function TypeormFactory(configService: ConfigService) {
    const enviroment = configService.get<string>("NODE_ENV");
    let config: TypeOrmModuleOptions;
    switch (enviroment) {
        case DEVELOPMENT:
            config = TypeormConfig.development;
            break;
        case TEST:
            config = TypeormConfig.test;
            break;
        case PRODUCTION:
            config = TypeormConfig.production;
            break;
        default:
            config = TypeormConfig.development;
    }
    return config;
}
