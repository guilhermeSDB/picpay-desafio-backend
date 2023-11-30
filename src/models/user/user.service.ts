import { Injectable } from '@nestjs/common';
import { FindOptionsWhere } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UserService {
	constructor(private readonly repository: UserRepository) {}

	create(createUserDto: CreateUserDto) {
		return this.repository.create(createUserDto);
	}

	findAll() {
		return this.repository.find();
	}

	findOne(id: number) {
		return this.repository.findOne({
			where: id as unknown as FindOptionsWhere<User>,
		});
	}

	update(id: number, updateUserDto: UpdateUserDto) {
		return this.repository.update(id, updateUserDto);
	}

	remove(id: number) {
		return this.repository.delete(id);
	}
}
