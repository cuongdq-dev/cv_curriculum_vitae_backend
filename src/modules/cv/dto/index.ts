import { Type } from 'class-transformer';
import { IsArray, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Order } from '../../../constants';
import { Pagination } from '../../../dto';

export class KeywordDto {
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsOptional()
  @IsNumber()
  count: number;
}
export class WebsiteRequestDto {
  @IsOptional()
  @IsString()
  url: string;

  @IsOptional()
  @IsArray()
  @Type(() => KeywordDto)
  keywords: KeywordDto[];

  @IsOptional()
  @IsString()
  from: string;

  @IsOptional()
  @IsString()
  supplier: string;

  @IsOptional()
  @IsString()
  pid: string;
}

export class WebsitesRequestDto {
  @IsNotEmpty()
  domains: string[];

  @IsOptional()
  @IsString()
  supplier: string;

  @IsOptional()
  @IsString()
  pid: string;
}

export class WebsiteSearchDto extends Pagination {
  @IsOptional()
  @IsString()
  keyword: string;

  @IsString()
  @IsOptional()
  sortKey: string;

  @IsIn([Order.ASC, Order.DESC])
  @IsOptional()
  sortOrder: string;
}
