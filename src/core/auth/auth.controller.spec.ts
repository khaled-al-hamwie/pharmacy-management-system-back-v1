import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

const authServiceMock = { login: jest.fn(), register: jest.fn() };
describe("AuthController", () => {
    let controller: AuthController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                {
                    provide: AuthService,
                    useValue: authServiceMock,
                },
            ],
        }).compile();

        controller = module.get<AuthController>(AuthController);
    });

    it("AuthController: should be defined", () => {
        expect(controller).toBeDefined();
    });

    it("AuthController.register: should call register service", () => {
        controller.register({ email: "bla" } as any);
        expect(authServiceMock.register).toBeCalledWith({ email: "bla" });
    });

    it("AuthController.login: should call login service", () => {
        controller.login({ email: "bla" } as any);
        expect(authServiceMock.login).toBeCalledWith({ email: "bla" });
    });
});
