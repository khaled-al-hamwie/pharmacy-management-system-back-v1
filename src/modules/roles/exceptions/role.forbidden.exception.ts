import { HttpException, HttpStatus } from "@nestjs/common";

export class RoleForbiddenException extends HttpException {
    constructor(role_name: string) {
        super(
            `the role "${role_name}" you are trying to add is forbidden because it is already craeted`,
            HttpStatus.FORBIDDEN
        );
    }
}
