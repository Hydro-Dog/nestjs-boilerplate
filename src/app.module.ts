import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './user/user.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpErrorFilter } from './shared/http.error.filter';
import { LogginInterseptor } from './shared/logging.interseptor';

@Module({
	imports: [
		TypeOrmModule.forRoot(), // insert typeorm module to the app
		UserModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		{ provide: APP_FILTER, useClass: HttpErrorFilter },
		{ provide: APP_INTERCEPTOR, useClass: LogginInterseptor },
	],
})
export class AppModule {}
