import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CV, CVSchema } from './schemas/cv.schema';
import { CVsController } from './cvs.controller';
import { CVsService } from './cvs.service';
@Module({
  imports: [MongooseModule.forFeature([{ name: CV.name, schema: CVSchema }])],
  controllers: [CVsController],
  providers: [CVsService],
  exports: [CVsService],
})
export class CVsModule { }
