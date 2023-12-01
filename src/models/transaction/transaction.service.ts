/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { DataSource, FindOptionsWhere } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { CreateTransactionDto } from './dtos/create-transaction.dto';
import { UpdateTransactionDto } from './dtos/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';
import { TransactionRepository } from './repositories/transaction.repository';

@Injectable()
export class TransactionService {
	constructor(
		private readonly repository: TransactionRepository,
		private readonly userService: UserService,
		private readonly httpService: HttpService,
		private dataSource: DataSource,
	) {}

	async create(transaction: CreateTransactionDto): Promise<Transaction> {
		const sender = await this.userService.findOne(transaction.senderId);
		const receiver = await this.userService.findOne(transaction.receiverId);

		this.userService.validateTransaction(sender, transaction.amount);

		const isAuthorized = await this.authorizeTransaction(
			sender,
			transaction.amount,
		);

		if (!isAuthorized) {
			throw new HttpException(
				'Transação não autorizada',
				HttpStatus.UNAUTHORIZED,
			);
		}

		transaction.amount = sender.balance - transaction.amount;
		receiver.balance = receiver.balance + transaction.amount;

		const result = await this.dataSource.transaction(async (manager) => {
			manager.update(User, sender.id, sender);
			manager.update(User, receiver.id, receiver);
			return manager.save(Transaction, transaction);
		});

		return result;
	}

	save(transaction: Transaction): Promise<Transaction> {
		return this.repository.save(transaction);
	}

	findAll(): Promise<Transaction[]> {
		return this.repository.find();
	}

	findOne(id: number): Promise<Transaction> {
		return this.repository.findOne({
			where: id as unknown as FindOptionsWhere<Transaction>,
		});
	}

	update(
		id: number,
		updateTransactionDto: UpdateTransactionDto,
	): Promise<Transaction> {
		this.repository.update(id, updateTransactionDto);
		return this.findOne(id);
	}

	remove(id: number) {
		return this.repository.delete(id);
	}

	async authorizeTransaction(sender: User, value: number): Promise<boolean> {
		const url = 'https://run.mocky.io/v3/5794d450-d2e2-4412-8131-73d0293ac1cc';

		const authorizationResponse = await lastValueFrom(
			this.httpService.get(url),
		);

		const authorizationData: { message: 'Autorizado' | 'Não Autorizado' } =
			authorizationResponse.data;

		if (authorizationResponse.status === HttpStatus.OK) {
			const message = authorizationData.message;
			return message === 'Autorizado';
		}
	}
}
