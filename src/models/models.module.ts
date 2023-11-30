import { Module } from '@nestjs/common';
import { TransactionModule } from './transaction/transaction.module';
import { UserModule } from './user/user.module';

const Models = [TransactionModule, UserModule];

@Module({
	imports: [...Models],
	providers: [...Models],
})
export class ModelsModule {}
