import { HttpException, HttpStatus } from "@nestjs/common";

export class EntityNotFoundException extends HttpException {
    constructor(entity_name: string) {
        super(`the ${entity_name} is not found`, HttpStatus.NOT_FOUND);
    }
}
