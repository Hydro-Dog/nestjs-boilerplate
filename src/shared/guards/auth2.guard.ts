import {
	Injectable,
	CanActivate,
	ExecutionContext,
	Inject,
	HttpException,
	HttpStatus,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';

import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		@Inject('UserService') private readonly userService: UserService,
	) {}

	async canActivate(context: ExecutionContext) {
		const request = context.switchToHttp().getRequest();
		if (!request.headers.authorization) {
			return false;
		}

		request.user = await this.validateRequest(request.headers.authorization);

		return await this.validateRequest(request);
	}

	async validateRequest(authorization: string) {
		const bearer = authorization.split(' ')[0];
		const authToken = authorization.split(' ')[1];

		if (bearer !== 'Bearer') {
			throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
		}

		const id = jwt.decode(authToken)['id'];
		const user = await this.userService.get(id);

		if (jwt.verify(authToken, user.secret)) {
			return true;
		} else {
			throw new HttpException('Authorization failed', HttpStatus.UNAUTHORIZED);
		}
	}
}
