import { Module } from "@nestjs/common";
import { CryptographService } from "./cryptograph.service";

@Module({
    providers: [CryptographService],
    exports: [CryptographService],
})
export class CryptographModule {}
