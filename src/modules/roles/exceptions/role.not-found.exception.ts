import { HttpException, HttpStatus } from "@nestjs/common";

export class RoleNotFoundException extends HttpException {
    constructor() {
        super(`the role is not found`, HttpStatus.NOT_FOUND);
    }
}
