import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../user/repositories/user.repository';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { Transaction } from './entities/transaction.entity';
import { TransactionRepository } from './repositories/transaction.repository';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';

@Module({
	imports: [TypeOrmModule.forFeature([Transaction]), UserModule, HttpModule],
	controllers: [TransactionController],
	providers: [
		TransactionService,
		TransactionRepository,
		UserService,
		UserRepository,
	],
})
export class TransactionModule {}
