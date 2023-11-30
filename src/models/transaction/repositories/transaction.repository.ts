import { DataSource, Repository } from 'typeorm';
import { Transaction } from '../entities/transaction.entity';

export class TransactionRepository extends Repository<Transaction> {
	constructor(private dataSource: DataSource) {
		super(Transaction, dataSource.createEntityManager());
	}
}
