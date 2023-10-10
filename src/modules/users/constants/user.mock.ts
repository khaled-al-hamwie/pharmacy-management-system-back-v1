import { Role } from "../../../modules/roles/entities/role.entity";
import { CreateUserDto } from "../dto/create-user.dto";

export const userRepositoryMock = {
    save: jest.fn(),
    create: jest.fn((x) => x),
    findOne: jest.fn(),
    softRemove: jest.fn(),
};

export const createUserDto: CreateUserDto = {
    role_id: "11223344",
    first_name: "bla",
    last_name: "bla",
    email: "bla@gmail",
    password: "blabla",
};

export const usersServiceMock = {
    create: jest.fn((x) => x),
    findOne: jest.fn((x) => {
        if (x.where.email == "found@gmail.com")
            return { password: "bla", user_id: "123", role: new Role() };
        else return null;
    }),
};
