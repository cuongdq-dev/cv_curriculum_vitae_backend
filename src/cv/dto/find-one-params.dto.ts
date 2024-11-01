import { IsString } from 'class-validator';

export class FindOneParams {
  @IsString()
  cvId: string;
}
