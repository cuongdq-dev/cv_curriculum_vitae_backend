import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { CVsController } from './cvs.controller';
import { CVsService } from './cvs.service';
import { CreateCVDto } from './dto/create-cv.dto';
import { UpdateCVDto } from './dto/update-cv.dto';
import { CV } from './schemas/cv.schema';

describe('CVsController', () => {
  let controller: CVsController;

  const mockCVService = {
    create: jest.fn((dto: CreateCVDto) => {
      return {
        ...dto,
        cvId: randomUUID(),
      };
    }),

    updateById: jest.fn().mockImplementation((cvId, dto) => ({
      cvId,
      ...dto,
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CVsController],
      providers: [CVsService],
    })
      .overrideProvider(CVsService)
      .useValue(mockCVService)
      .compile();

    controller = module.get<CVsController>(CVsController);
  });

  it('debe estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('debe crear un usuario', async () => {
    const dto: CreateCVDto = {
      name: 'JEANPIER',
    };
    const created: CV = await controller.create(dto);
    expect(created).toEqual({
      cvId: expect.any(String),
    });

    expect(mockCVService.create).toHaveBeenCalled();
    expect(mockCVService.create).toHaveBeenCalledWith(dto);
  });

  it('debe actualizar un usuario', async () => {
    const dto: UpdateCVDto = {
      name: 'JESÚS',
    };
    const cvId = 'abc';
    const updated: CV = await controller.update({ cvId }, dto);
    expect(updated).toEqual({
      cvId,
      ...dto,
    });

    expect(mockCVService.updateById).toHaveBeenCalled();
  });
});
