import { IsEmail, IsNotEmpty, IsNumber, IsPhoneNumber } from 'class-validator';

export class CreateUserDto {
  @IsPhoneNumber()
  phone: string;

  @IsEmail()
  email: string;

  @IsNumber()
  hours: number;
}
