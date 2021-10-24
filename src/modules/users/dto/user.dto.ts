import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  Min,
  IsPositive,
  IsOptional,
  IsPhoneNumber,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty()
  @IsPhoneNumber()
  @IsNotEmpty()
  readonly phone: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly role: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class FilterUsersDto {
  @IsOptional()
  @IsPositive()
  @Min(0)
  limit: number;

  @IsOptional()
  @IsPositive()
  @Min(0)
  offset: number;
}
