import { Role } from "../../../modules/roles/entities/role.entity";

export interface PayloadInterface {
    sub: string;
    role: Role;
}
