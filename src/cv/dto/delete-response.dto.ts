import { ApiProperty } from '@nestjs/swagger';

export class DeleteCVResponse {
  @ApiProperty({
    example: 1,
    description: 'Number of removed CV',
  })
  deletedCount: number;
}
