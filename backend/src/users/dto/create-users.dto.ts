import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsPhoneNumber, IsDateString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'John', description: 'The first name of the user' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'The last name of the user' })
  @IsString()
  @IsNotEmpty()
  lastName: string;
  
  @ApiProperty({ example: 'Team meeting at 5 PM', description: 'The content of the reminder message' })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({ example: 'john.doe@example.com', description: 'User\'s email address' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '+15551234567', description: 'User\'s phone number with country code' })
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({ example: '2025-12-25', description: 'The target date for the notification' })
  @IsDateString()
  date: string;

  @ApiProperty({ example: '14:30', description: 'The target time for the notification in 24-hour format' })
  @IsString()
  @IsNotEmpty()
  time: string;
}