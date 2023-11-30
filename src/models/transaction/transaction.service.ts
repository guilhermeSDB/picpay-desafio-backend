import { Injectable } from '@nestjs/common';
import { FindOptionsWhere } from 'typeorm';
import { CreateTransactionDto } from './dtos/create-transaction.dto';
import { UpdateTransactionDto } from './dtos/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';
import { TransactionRepository } from './repositories/transaction.repository';

@Injectable()
export class TransactionService {
	constructor(private readonly repository: TransactionRepository) {}

	create(createTransactionDto: CreateTransactionDto) {
		return this.repository.create(createTransactionDto);
	}

	findAll() {
		return this.repository.find();
	}

	findOne(id: number) {
		return this.repository.findOne({
			where: id as unknown as FindOptionsWhere<Transaction>,
		});
	}

	update(id: number, updateTransactionDto: UpdateTransactionDto) {
		return this.repository.update(id, updateTransactionDto);
	}

	remove(id: number) {
		return this.repository.delete(id);
	}
}
