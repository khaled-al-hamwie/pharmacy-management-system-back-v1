import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import { PayloadInterface } from "../../../core/auth/interfaces/payload.interface";
import { Role } from "../../../modules/roles/entities/role.entity";
import { JJwtService } from "./j-jwt.service";

describe("JJwtService", () => {
    let service: JJwtService;
    let jwtService: JwtService;
    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [JwtModule, ConfigModule.forRoot()],
            providers: [JJwtService, JwtService, ConfigService],
        }).compile();

        service = module.get<JJwtService>(JJwtService);
        jwtService = module.get<JwtService>(JwtService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });

    it("JJwtService.signToken", async () => {
        const payload: PayloadInterface = {
            user_id: "thie-si-sub",
            role: new Role(),
        };
        const res = await service.signToken(payload);
        expect(res.access_token).not.toBeNull();
        expect(res.access_token).not.toBeUndefined();
        const decoded = await jwtService.decode(res.access_token);
        expect(decoded.user_id).toEqual("thie-si-sub");
    });
});
