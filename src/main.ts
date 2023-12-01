import { NestFactory } from '@nestjs/core';

import helmet from '@fastify/helmet';
import {
	FastifyAdapter,
	NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		new FastifyAdapter(),
	);

	const config = new DocumentBuilder()
		.setTitle('Picpay API')
		.setDescription('The Picpay API documentation')
		.setVersion('1.0')
		.build();

	const document = SwaggerModule.createDocument(app, config);

	SwaggerModule.setup('api', app, document);

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			transform: true,
			transformOptions: { enableImplicitConversion: true },
		}),
	);

	app.enableCors();
	await app.register(helmet);
	await app.listen(3000);
}

bootstrap();
