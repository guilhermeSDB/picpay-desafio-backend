import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { User } from '../user/entities/user.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Injectable()
export class NotificationService {
	constructor(private readonly httpService: HttpService) {}

	create(createNotificationDto: CreateNotificationDto) {
		console.log(createNotificationDto);
		return 'This action adds a new notification';
	}

	findAll() {
		return `This action returns all notification`;
	}

	findOne(id: number) {
		return `This action returns a #${id} notification`;
	}

	update(id: number, updateNotificationDto: UpdateNotificationDto) {
		console.log(updateNotificationDto);
		return `This action updates a #${id} notification`;
	}

	remove(id: number) {
		return `This action removes a #${id} notification`;
	}

	async sendNotification(user: User, message: string) {
		const email = user.email;

		const notificationRequest: CreateNotificationDto = {
			email,
			message,
		};

		const notificationResponse = await lastValueFrom(
			this.httpService.post(
				'https://run.mocky.io/v3/54dc2cf1-3add-45b5-b5a9-6bf7e7f1f4a6',
				notificationRequest,
			),
		);

		if (!(notificationResponse.status === HttpStatus.OK)) {
			throw new HttpException(
				'Serviço de notificações esta fora do ar',
				HttpStatus.SERVICE_UNAVAILABLE,
			);
		}
	}
}
