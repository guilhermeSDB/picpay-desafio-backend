import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { TransactionRepository } from './repositories/transaction.repository';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';

@Module({
	imports: [TypeOrmModule.forFeature([Transaction])],
	controllers: [TransactionController],
	providers: [TransactionService, TransactionRepository],
})
export class TransactionModule {}
