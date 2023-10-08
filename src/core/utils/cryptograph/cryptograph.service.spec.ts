import { Test, TestingModule } from "@nestjs/testing";
import { hash } from "bcrypt";
import { CryptographService } from "./cryptograph.service";

describe("CryptographService", () => {
    let service: CryptographService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CryptographService],
        }).compile();

        service = module.get<CryptographService>(CryptographService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });

    it("CryptographService.hash: it should hash", async () => {
        const data = "my name is password";
        const hashData = await service.b_hash(data);
        expect(hashData).not.toEqual(data);
    });

    it("CryptographService.compare: it should return true when hash is valid", async () => {
        const data = "my name is password";
        const hashData = await hash(data, 10);
        const result = await service.compare(data, hashData);
        expect(result).toBeTruthy();
    });

    it("CryptographService.compare: it should return false when hash is not valid", async () => {
        const data = "my name is password";
        const hashData = (await hash(data, 10)) + "fljf";
        const result = await service.compare(data, hashData);
        expect(result).toBeFalsy();
    });
});
