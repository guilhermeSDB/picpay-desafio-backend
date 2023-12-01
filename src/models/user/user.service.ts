import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserType } from './interfaces/user-type.enum';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UserService {
	constructor(private readonly repository: UserRepository) {}

	create(createUserDto: CreateUserDto): Promise<User> {
		const user = this.repository.create(createUserDto);
		return this.save(user);
	}

	save(user: User): Promise<User> {
		return this.repository.save(user);
	}

	findAll() {
		return this.repository.find();
	}

	findOne(id: number): Promise<User> {
		return this.repository.findOne({
			where: {
				id,
			},
		});
	}

	async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
		await this.repository.update(id, updateUserDto);
		return this.findOne(id);
	}

	remove(id: number) {
		return this.repository.delete(id);
	}

	validateTransaction(sender: User, amount: number) {
		if (sender.userType === UserType.MERCHANT) {
			throw new HttpException(
				'Usuario do tipo Lojista não esta autorizado a realizar transação.',
				HttpStatus.UNAUTHORIZED,
			);
		}

		if (sender.balance - amount < 0) {
			throw new HttpException('Saldo insuficiente', HttpStatus.BAD_REQUEST);
		}
	}
}
