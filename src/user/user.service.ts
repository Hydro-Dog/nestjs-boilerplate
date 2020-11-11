import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { generateSecret } from 'src/helpers/generateSecret';
import { Repository } from 'typeorm';
import { UserDTO } from './user.dto';

import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserEntity)
		private userRepository: Repository<UserEntity>,
	) {}

	async login(data: Partial<UserDTO>): Promise<Partial<UserDTO>> {
		const { email, password } = data;
		const user = await this.userRepository.findOne({ where: { email } });
		const isValid = await user?.comparePassword(password);
		if (!user || !isValid) {
			throw new HttpException(
				'Invalid username/password',
				HttpStatus.BAD_REQUEST,
			);
		}

		const secret = generateSecret();
		await this.userRepository.update({ id: user.id }, { secret });

		return user.toResponseObject(true, secret);
	}

	async register(data: UserDTO): Promise<Partial<UserDTO>> {
		const { email } = data;
		let user = await this.userRepository.findOne({ where: { email } });
		if (user) {
			throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
		}

		user = await this.userRepository.create(data);
		await this.userRepository.save(user);
		return user.toResponseObject(true, user.secret);
	}

	async getAll(): Promise<Partial<UserDTO[]>> {
		const users = await this.userRepository.find();
		return users.map(user => user.toResponseObject());
	}

	async get(id: string): Promise<Partial<UserDTO>> {
		try {
			const user = await this.userRepository.findOne({ where: { id } });
			if (!user) {
				throw new HttpException('Not found', HttpStatus.NOT_FOUND);
			}

			return user.toResponseObject();
		} catch (error) {
			//catch block for invalid uuid -------------------------------------------
			throw new HttpException('Not found', HttpStatus.NOT_FOUND);
		}
	}

	async update(id: string, data: Partial<UserDTO>): Promise<Partial<UserDTO>> {
		const user = await this.userRepository.update({ id }, data);
		if (!user.affected) {
			throw new HttpException('Not found', HttpStatus.NOT_FOUND);
		}

		return this.userRepository.findOne({ where: { id } });
	}

	async destroy(id: string) {
		const user = await this.userRepository.delete({ id });
		if (!user.affected) {
			throw new HttpException('Not found', HttpStatus.NOT_FOUND);
		}
		return { user: id };
	}
}
