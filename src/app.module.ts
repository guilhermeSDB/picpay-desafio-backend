import { Module } from '@nestjs/common';
import { ModelsModule } from './models/models.module';
import { SharedModule } from './shared/shared.module';

@Module({
	imports: [SharedModule, ModelsModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
