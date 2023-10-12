import { HttpException, HttpStatus } from "@nestjs/common";

export class EntityForbiddenException extends HttpException {
    constructor(entity_name: string, value: string) {
        super(
            {
                entity_name,
                value,
                message: `the "${entity_name}" you are trying to add is forbidden`,
            },
            HttpStatus.FORBIDDEN
        );
    }
}
