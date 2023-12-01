import { IsEmail, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
	firstName: string;

	lastName: string;

	document: string;

	balance: number;

	@IsEmail()
	email: string;

	@IsStrongPassword()
	password: string;
}
