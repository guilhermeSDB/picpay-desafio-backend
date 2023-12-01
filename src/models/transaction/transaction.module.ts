import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationModule } from '../notification/notification.module';
import { NotificationService } from '../notification/notification.service';
import { UserRepository } from '../user/repositories/user.repository';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { Transaction } from './entities/transaction.entity';
import { TransactionRepository } from './repositories/transaction.repository';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([Transaction]),
		UserModule,
		NotificationModule,
		HttpModule,
	],
	controllers: [TransactionController],
	providers: [
		TransactionService,
		TransactionRepository,
		UserService,
		UserRepository,
		NotificationService,
	],
})
export class TransactionModule {}
