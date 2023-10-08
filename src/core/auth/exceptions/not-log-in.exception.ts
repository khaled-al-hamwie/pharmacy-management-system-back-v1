import { HttpException, HttpStatus } from "@nestjs/common";

export class notLogInException extends HttpException {
    constructor() {
        super(`you are not logged in`, HttpStatus.FORBIDDEN);
    }
}
