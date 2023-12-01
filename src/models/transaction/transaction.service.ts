/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { DataSource, FindOptionsWhere } from 'typeorm';
import { NotificationService } from '../notification/notification.service';
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
		private readonly notificationService: NotificationService,
		private readonly userService: UserService,
		private readonly httpService: HttpService,
		private dataSource: DataSource,
	) {}

	async create({
		amount: value,
		receiverId,
		senderId,
	}: CreateTransactionDto): Promise<Transaction> {
		const sender = await this.userService.findOne(senderId);
		const receiver = await this.userService.findOne(receiverId);

		this.userService.validateTransaction(sender, value);

		const isAuthorized = await this.authorizeTransaction(sender, value);

		if (!isAuthorized) {
			throw new HttpException(
				'Transação não autorizada',
				HttpStatus.UNAUTHORIZED,
			);
		}

		const transactionEntity: Partial<Transaction> = {
			amount: value,
			receiver: receiver,
			sender: sender,
		};
		sender.balance = Number(sender.balance) - Number(value);
		receiver.balance = Number(receiver.balance) + Number(value);

		const result = await this.dataSource.transaction(async (manager) => {
			const entity = manager.create(Transaction, transactionEntity);
			manager.update(User, sender.id, sender);
			manager.update(User, receiver.id, receiver);
			return manager.save(Transaction, entity);
		});

		this.notificationService.sendNotification(
			sender,
			'Transação realizada com sucesso',
		);

		this.notificationService.sendNotification(
			receiver,
			'Transação recebida com sucesso',
		);

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

	async update(
		id: number,
		updateTransactionDto: UpdateTransactionDto,
	): Promise<Transaction> {
		await this.repository.update(id, updateTransactionDto);
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
