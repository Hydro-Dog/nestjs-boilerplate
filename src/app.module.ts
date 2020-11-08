import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './user/user.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpErrorFilter } from './shared/http.error.filter';
import { LoggerInterseptor } from './shared/logging.interseptor';
import { AuthModule } from './auth/auth.module';

@Module({
	imports: [
		TypeOrmModule.forRoot(), // insert typeorm module to the app
		UserModule,
		AuthModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		{ provide: APP_FILTER, useClass: HttpErrorFilter },
		{ provide: APP_INTERCEPTOR, useClass: LoggerInterseptor },
	],
})
export class AppModule {}
