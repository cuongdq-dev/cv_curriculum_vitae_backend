import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { hash } from 'bcrypt';
import { randomUUID } from 'crypto';
import { Model } from 'mongoose';
import { CreateCVDto } from './dto/create-cv.dto';
import { DeleteCVResponse } from './dto/delete-response.dto';
import { UpdateCVDto } from './dto/update-cv.dto';
import { CV, CVDocument } from './schemas/cv.schema';

@Injectable()
export class CVsService {
  constructor(@InjectModel(CV.name) private readonly cvModel: Model<CVDocument>) { }

  async findAll(): Promise<CV[]> {
    return this.cvModel.find().lean();
  }


  async findFirst(): Promise<CV> {
    const cv = await this.cvModel.findOne({}).lean();
    if (!cv) {
      throw new NotFoundException(`No existe el usuario`);
    }
    return cv;
  }

  async findById(cvId: string): Promise<CV> {
    const cv = await this.cvModel.findOne({ cvId }).lean();
    if (!cv) {
      throw new NotFoundException(`No existe el usuario ${cvId}`);
    }
    return cv;
  }

  async findByEmail(email: string): Promise<CV> {
    const cv = await this.cvModel.findOne({ email }).lean();
    if (!cv) {
      throw new NotFoundException(`No existe el usuario ${email}`);
    }
    return cv;
  }

  async create(cv: CreateCVDto): Promise<CV> {
    const alreadyExists = await this.cvModel.exists({ email: cv.email }).lean();
    if (alreadyExists) {
      throw new ConflictException(`CV with that email already exists`);
    }
    console.log('%csrc/cv/cvs.service.ts:40 object', 'color: #007acc;', cv);
    const cvToCreate: CV = { ...cv, cvId: randomUUID(), };
    return this.cvModel.create(cvToCreate);
  }

  async updateById(cvId: string, cvUpdates: UpdateCVDto): Promise<CV> {
    return this.cvModel
      .findOneAndUpdate({ cvId }, cvUpdates, {
        new: true,
      })
      .lean();
  }

  async remove(cvId: string): Promise<DeleteCVResponse> {
    return this.cvModel.deleteOne({ cvId }).lean();
  }
}
