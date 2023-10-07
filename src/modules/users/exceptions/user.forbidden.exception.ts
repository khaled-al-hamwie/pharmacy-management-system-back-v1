import { HttpException, HttpStatus } from "@nestjs/common";

export class userForbiddenException extends HttpException {
    constructor(email: string) {
        super(
            `the email "${email}" you are trying to add is forbidden`,
            HttpStatus.FORBIDDEN
        );
    }
}
