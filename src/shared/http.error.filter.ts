import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException,
	Logger,
} from '@nestjs/common';

//this class catches all http response errors -----------------------------
@Catch()
export class HttpErrorFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		console.log('exception: ', exception);
		const ctx = host.switchToHttp();
		const request = ctx.getRequest();
		const response = ctx.getResponse();

		const code = exception.getStatus();
		const timeStamp = new Date().toLocaleTimeString();
		const path = request.url;
		const method = request.method;
		const message = exception.message;

		const errorResponse = { code, timeStamp, path, method, message };

		response.status(code).json(errorResponse);
		Logger.error(
			`${method} ${path}`,
			JSON.stringify(errorResponse),
			'ExeptionFilter',
		);
	}
}
