import { EventEmitter2 } from "@nestjs/event-emitter";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { roleRepositoryMock } from "./constants/roles.mock";
import { CreateRoleDto } from "./dto/create-role.dto";
import { Role } from "./entities/role.entity";
import { RolesService } from "./roles.service";

const mockEmitter = {
    emit: jest.fn(),
};
describe("RolesService", () => {
    let service: RolesService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RolesService,
                {
                    provide: getRepositoryToken(Role),
                    useValue: roleRepositoryMock,
                },
                { provide: EventEmitter2, useValue: mockEmitter },
            ],
        }).compile();

        service = module.get<RolesService>(RolesService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });

    it("role.findOne: should not return the mock data", async () => {
        const result = await service.findOne({
            where: { name: "khaled" },
        });
        expect(result).toBeUndefined();
    });

    it("role.findOne: should return the mock data", async () => {
        const result = await service.findOne({
            where: { name: "exist" },
        });
        expect(result).toEqual({
            role_id: "6d6d32d7-41f5-46ec-b772-41d8cf4a59ef",
            name: "exist",
            description: "some stuff",
            users: [],
        });
    });

    it("role.isUnique: should not throw when unique", async () => {
        const role = await service.isUnique("name");
        expect(role).toBeTruthy();
    });

    it("role.isUnique: should throw when not unique", async () => {
        await expect(() => service.isUnique("exist")).rejects.toThrow();
    });

    it("role.create: should create", async () => {
        const isUniqueSpy = jest.spyOn(service, "isUnique");
        const createRoleDto: CreateRoleDto = { name: "not " };
        const role = await service.create(createRoleDto);
        expect(isUniqueSpy).toHaveBeenCalledWith(createRoleDto.name);
        expect(roleRepositoryMock.create).toBeCalledWith(createRoleDto);
        expect(mockEmitter.emit).toBeCalled();
        expect(role).toBe(createRoleDto);
    });
});
