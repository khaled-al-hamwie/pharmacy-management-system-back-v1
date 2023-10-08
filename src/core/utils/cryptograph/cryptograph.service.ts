import { Injectable } from "@nestjs/common";
import { compare, hash } from "bcrypt";

@Injectable()
export class CryptographService {
    async b_hash(data: string) {
        return hash(data, 10);
    }

    compare(original: string, hash: string) {
        return compare(original, hash);
    }
}
