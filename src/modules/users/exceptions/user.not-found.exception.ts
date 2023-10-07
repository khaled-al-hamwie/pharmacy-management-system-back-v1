import { HttpException, HttpStatus } from "@nestjs/common";

export class UserNotFoundException extends HttpException {
    constructor() {
        super(`the user is not found`, HttpStatus.NOT_FOUND);
    }
}
