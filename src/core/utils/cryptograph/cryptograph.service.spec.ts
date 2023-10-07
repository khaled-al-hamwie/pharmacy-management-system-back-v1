import { Test, TestingModule } from "@nestjs/testing";
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
});
