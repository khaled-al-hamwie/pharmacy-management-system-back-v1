import { Injectable } from "@nestjs/common";
import { compareSync, hashSync } from "bcrypt";

@Injectable()
export class CryptographService {
    hash(data: string) {
        const hash = hashSync(data, 10);
        return hash;
    }

    compare(original: string, hash: string) {
        return compareSync(original, hash);
    }
}
