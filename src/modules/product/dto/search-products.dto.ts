import {
  IsString,
  IsOptional,
  IsPositive,
  Max,
  IsNumber,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class SearchProductsDto {
  @IsString()
  @IsOptional()
  query?: string;

  @IsString()
  @IsOptional()
  language?: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  page: number = 1;

  @IsNumber()
  @IsPositive()
  @Max(100)
  @IsOptional()
  @Transform(({ value }) => Number(value))
  limit: number = 10;
}
