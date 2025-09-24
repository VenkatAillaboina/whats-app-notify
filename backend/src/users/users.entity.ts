import { IsEmail, IsNotEmpty, IsNumber, IsPhoneNumber } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsPhoneNumber()
    phone: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsNumber()
    hours: number;
}
