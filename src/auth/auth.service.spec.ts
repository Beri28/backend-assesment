import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from './auth.service';
import { User, UserDocument } from './schemas/user.schema';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  let userModel: Model<UserDocument>;

  const mockUser = {
    _id: 'someId',
    email: 'test@example.com',
    password: '$2b$10$somehashedpassword',
    walletAddress: '0x123',
    roles: ['user'],
    toObject: () => ({
      _id: 'someId',
      email: 'test@example.com',
      password: '$2b$10$somehashedpassword',
      walletAddress: '0x123',
      roles: ['user'],
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getModelToken(User.name),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            new: jest.fn().mockResolvedValue(mockUser),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('test-token'),
            verify: jest.fn().mockReturnValue({ sub: 'someId', email: 'test@example.com' }),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    userModel = module.get<Model<UserDocument>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return user object when credentials are valid', async () => {
      jest.spyOn(userModel, 'findOne').mockResolvedValue(mockUser);
      const result = await service.validateUser('test@example.com', 'password');
      expect(result).toBeDefined();
      expect(result.email).toBe('test@example.com');
    });

    it('should return null when user is not found', async () => {
      jest.spyOn(userModel, 'findOne').mockResolvedValue(null);
      const result = await service.validateUser('wrong@example.com', 'password');
      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return access token and user info', async () => {
      const result = await service.login(mockUser);
      expect(result.access_token).toBeDefined();
      expect(result.user).toBeDefined();
      expect(result.user.email).toBe(mockUser.email);
      expect(jwtService.sign).toHaveBeenCalled();
    });
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      jest.spyOn(userModel, 'findOne').mockResolvedValue(null);
      jest.spyOn(userModel.prototype, 'save').mockResolvedValue(mockUser);

      const result = await service.register('new@example.com', 'password', '0x456');
      expect(result).toBeDefined();
      expect(result.email).toBe(mockUser.email);
    });

    it('should throw UnauthorizedException when user already exists', async () => {
      jest.spyOn(userModel, 'findOne').mockResolvedValue(mockUser);

      await expect(
        service.register('test@example.com', 'password', '0x123'),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('validateToken', () => {
    it('should return decoded token when valid', async () => {
      const result = await service.validateToken('valid-token');
      expect(result).toBeDefined();
      expect(result.email).toBe('test@example.com');
    });

    it('should throw UnauthorizedException when token is invalid', async () => {
      jest.spyOn(jwtService, 'verify').mockImplementation(() => {
        throw new Error();
      });

      await expect(service.validateToken('invalid-token')).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
