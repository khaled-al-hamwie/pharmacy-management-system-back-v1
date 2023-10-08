import { CryptographService } from "../utils/cryptograph/cryptograph.service";

export const EmitterMock = {
    emit: jest.fn(),
};

export const CryptographServiceMock: CryptographService = {
    compare: jest.fn(),
    b_hash: jest.fn(),
};

export const JJwtServiceMock = {
    signToken: jest.fn(),
};
