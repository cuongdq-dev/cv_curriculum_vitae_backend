import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CVsService } from './cvs.service';
import { CreateCVDto } from './dto/create-cv.dto';
import { DeleteCVResponse } from './dto/delete-response.dto';
import { FindOneParams } from './dto/find-one-params.dto';
import { UpdateCVDto } from './dto/update-cv.dto';
import { CV } from './schemas/cv.schema';

// @UseInterceptors(ClassSerializerInterceptor)
@ApiTags('cvs')
@Controller('cvs')
export class CVsController {
  constructor(private readonly cvsService: CVsService) { }

  @Get()
  @ApiOperation({ description: 'Get all cvs' })
  @ApiOkResponse({
    description: 'The cvs were successfully obtained.',
    type: [CV],
  })
  async getAll(): Promise<CV> {
    return this.cvsService.findFirst();
  }

  // TODO UPDATE CV ID
  @Get(':cvId')
  @ApiOperation({
    description: 'Get a cv by cvId.',
  })
  @ApiOkResponse({
    description: 'The cv was successfully obtained.',
    type: CV,
  })
  async getById(@Param() { cvId }: FindOneParams): Promise<CV> {
    return this.cvsService.findById(cvId);
  }

  @Post()
  @ApiOperation({ description: 'Create a cv.' })
  @ApiCreatedResponse({
    description: 'The cv has been successfully created.',
    type: CV,
  })
  async create(@Body() cv: any): Promise<CV> {
    return this.cvsService.create(cv);
  }

  @Patch(':cvId')
  @ApiOperation({
    description: 'Update a cv by cvId.',
  })
  @ApiOkResponse({
    description: 'The cv was successfully updated.',
    type: CV,
  })
  async update(
    @Param() { cvId }: FindOneParams,
    @Body() updateCVDto: UpdateCVDto,
  ): Promise<CV> {
    return this.cvsService.updateById(cvId, updateCVDto);
  }

  @Delete(':cvId')
  @ApiOperation({
    description: 'Delete a cv by cvId.',
  })
  @ApiOkResponse({
    description: 'The cv was successfully deleted.',
    type: DeleteCVResponse,
  })
  async deleteById(@Param() { cvId }: FindOneParams): Promise<DeleteCVResponse> {
    return this.cvsService.remove(cvId);
  }
}
