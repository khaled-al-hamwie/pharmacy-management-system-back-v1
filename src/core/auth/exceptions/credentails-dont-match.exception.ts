import { HttpException, HttpStatus } from "@nestjs/common";

export class CredentailsDontMatchException extends HttpException {
    constructor() {
        super(`credentails dont match`, HttpStatus.FORBIDDEN);
    }
}
