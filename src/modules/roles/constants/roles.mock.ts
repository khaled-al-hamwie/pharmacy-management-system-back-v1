import { FindManyOptions } from "typeorm";
import { CreateRoleDto } from "../dto/create-role.dto";
import { Role } from "../entities/role.entity";

export const createRoleDto: CreateRoleDto = {
    name: "stuff",
};

export const rolesDbMock: Role[] = [
    {
        role_id: "6d6d32d7-41f5-46ec-b772-41d8cf4a59ef",
        name: "exist",
        description: "some stuff",
        deleted_at: null,
        users: [],
        abilities: [],
    },
];

export const roleRepositoryMock = {
    save: jest.fn(),
    create: jest.fn((x) => x),
    findOne: jest.fn((options: FindManyOptions<Role>) =>
        rolesDbMock.find((role) => {
            const w = options.where;
            for (const key in w) {
                return role[key] == w[key];
            }
        })
    ),
    softRemove: jest.fn(),
};

export const rolesServiceMock = {
    create: jest.fn(),
    findAll: jest.fn(() => rolesDbMock),
    findOne: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
};
