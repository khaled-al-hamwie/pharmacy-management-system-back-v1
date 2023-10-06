import { HttpStatus, ValidationPipeOptions } from "@nestjs/common";
import * as dotenv from "dotenv";
import { PRODUCTION } from "../../../constants/enviroment";
dotenv.config();

export const ValidationOptions: ValidationPipeOptions = {
    whitelist: true,
    enableDebugMessages: process.env.NODE_ENV == PRODUCTION ? false : true,
    errorHttpStatusCode: HttpStatus.FORBIDDEN,
    stopAtFirstError: true,
};
