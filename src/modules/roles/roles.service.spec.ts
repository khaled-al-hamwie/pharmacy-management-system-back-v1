import { EventEmitter2 } from "@nestjs/event-emitter";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { roleRepositoryMock, rolesDbMock } from "./constants/roles.mock";
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

    it("RolesService: should be defined", () => {
        expect(service).toBeDefined();
    });

    it("RolesService.findOne: should not return the mock data", async () => {
        const result = await service.findOne({
            where: { name: "khaled" },
        });
        expect(result).toBeUndefined();
    });

    it("RolesService.findOne: should return the mock data", async () => {
        const result = await service.findOne({
            where: { name: "exist" },
        });
        expect(result).toEqual(rolesDbMock[0]);
    });

    it("RolesService.isUnique: should not throw when unique", async () => {
        const role = await service.isUnique("name");
        expect(role).toBeTruthy();
    });

    it("RolesService.isUnique: should throw when not unique", async () => {
        await expect(() => service.isUnique("exist")).rejects.toThrow();
    });

    it("RolesService.create: should create", async () => {
        const isUniqueSpy = jest.spyOn(service, "isUnique");
        const createRoleDto: CreateRoleDto = { name: "not " };
        const role = await service.create(createRoleDto);
        expect(isUniqueSpy).toHaveBeenCalledWith(createRoleDto.name);
        expect(roleRepositoryMock.create).toBeCalledWith(createRoleDto);
        expect(mockEmitter.emit).toBeCalled();
        expect(role).toBe(createRoleDto);
    });

    it("RolesService.findById: should return id", async () => {
        const role_id = rolesDbMock[0].role_id;
        const role = await service.findById(role_id);
        expect(role).toBe(rolesDbMock[0]);
    });

    it("RolesService.findById: should throw error when role not exist", async () => {
        const role_id = rolesDbMock[0].role_id + "jfls";
        await expect(() => service.findById(role_id)).rejects.toThrow();
    });
});
