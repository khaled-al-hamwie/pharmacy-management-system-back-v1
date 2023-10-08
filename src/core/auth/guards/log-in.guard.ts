import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { LoggedInStragegy } from "../../constants/strategy";

@Injectable()
export class LogInGuard extends AuthGuard(LoggedInStragegy) {}
