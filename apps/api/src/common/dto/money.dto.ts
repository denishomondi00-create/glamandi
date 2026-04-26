import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class MoneyDto {
  @IsNumber()
  @Min(0)
  amount!: number;

  @IsOptional()
  @IsString()
  currency = 'KES';
}
