import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';

const Shareds = [DatabaseModule, ConfigModule];

@Module({
	imports: [...Shareds],
	providers: [...Shareds],
})
export class SharedModule {}
