import { ApiProperty } from '@nestjs/swagger'
import { IsDate, IsEmail, Max, MaxLength } from 'class-validator'

export class ReviewDto {
  @ApiProperty()
  user?: string

  @ApiProperty()
  @MaxLength(250)
  name: string

  @ApiProperty()
  @IsEmail()
  email: string

  @ApiProperty()
  @Max(5)
  rating: number

  @ApiProperty()
  @MaxLength(250)
  review: string

  @ApiProperty()
  @IsDate()
  date: Date
}