import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { hash } from 'bcrypt';
import { randomUUID } from 'crypto';
import { CreateCVDto } from './dto/create-cv.dto';
import { CV } from './schemas/cv.schema';
import { CVsService } from './cvs.service';

describe('CVsService', () => {
  let service: CVsService;

  const mockCVsRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    create: jest.fn(async (dto) => {
      const passHash = await hash(dto.password, 10);
      return { ...dto, cvId: randomUUID(), password: passHash };
    }),
    exists: jest.fn(),
  };

  mockCVsRepository.exists.mockImplementationOnce(() => ({
    lean: jest.fn().mockReturnValue(null),
  }));

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CVsService,
        {
          provide: getModelToken(CV.name),
          useValue: mockCVsRepository,
        },
      ],
    }).compile();

    service = module.get<CVsService>(CVsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('debe guardar un usuario y retornarlo', async () => {
    console.log(process.env.NODE_ENV);
    const dto: CreateCVDto = {
      name: 'jeanpier',
      surname: 'mendoza',
      email: 'jeanpi3rm@gmail.com',
      password: '1234',
    };
    const created = await service.create(dto);
    expect(created).toEqual({
      cvId: expect.any(String),
      name: 'jeanpier',
      surname: 'mendoza',
      email: 'jeanpi3rm@gmail.com',
      password: expect.any(String),
    });
  });
});
