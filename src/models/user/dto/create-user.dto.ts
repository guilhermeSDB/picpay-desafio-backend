import { IsEmail, IsEnum, IsNumber, IsString } from 'class-validator';
import { UserType } from '../interfaces/user-type.enum';

export class CreateUserDto {
	@IsString()
	firstName: string;

	@IsString()
	lastName: string;

	@IsString()
	document: string;

	@IsNumber()
	balance: number;

	@IsEmail()
	email: string;

	@IsString()
	password: string;

	@IsEnum(UserType)
	userType: UserType;
}
