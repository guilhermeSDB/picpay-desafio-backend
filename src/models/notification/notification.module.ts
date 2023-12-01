import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';

@Module({
	imports: [HttpModule],
	controllers: [NotificationController],
	providers: [NotificationService],
})
export class NotificationModule {}
