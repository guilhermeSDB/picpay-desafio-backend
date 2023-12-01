import { Module } from '@nestjs/common';
import { NotificationModule } from './notification/notification.module';
import { TransactionModule } from './transaction/transaction.module';
import { UserModule } from './user/user.module';

const Models = [TransactionModule, UserModule, NotificationModule];

@Module({
	imports: [...Models],
	providers: [...Models],
})
export class ModelsModule {}
