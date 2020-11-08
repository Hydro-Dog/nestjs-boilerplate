import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';

import * as jwt from 'jsonwebtoken';
import { generateSecret } from 'src/helpers/generateSecret';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(UserEntity)
		private userRepository: Repository<UserEntity>,
	) {}

	async refresh(id, refresh) {
		const bearer = refresh.split(' ')[0];
		const refreshToken = refresh.split(' ')[1];

		if (bearer !== 'Bearer') {
			throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
		}

		const user = await this.userRepository.findOne({ where: { id } });
		const secret = user.secret;
		let jwtVerify = null;
		try {
			jwtVerify = jwt.verify(refreshToken, secret);
		} catch (err) {
			throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
		}

		const newSecret = generateSecret();
		const authToken = jwt.sign({ id }, newSecret, { expiresIn: '5m' });
		const newRefreshToken = jwt.sign({ id }, newSecret, { expiresIn: '6m' });

		if (jwtVerify) {
			await this.userRepository.update({ id }, { secret: newSecret });
			return { authToken, refreshToken: newRefreshToken };
		}
	}
}
