import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDTO } from './user.dto';

import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserEntity)
		private userRepository: Repository<UserEntity>,
	) {}

	async getAll() {
		return await this.userRepository.find();
	}

	async create(data: UserDTO) {
		const user = this.userRepository.create(data);
		await this.userRepository.save(user);
		return user;
	}

	async get(id: string) {
		try {
			const user = await this.userRepository.findOne({ where: { id } });
			if (!user) {
				throw new HttpException('Not found', HttpStatus.NOT_FOUND);
			}

			return user;
		} catch (error) {
			//catch block for invalid uuid -------------------------------------------
			throw new HttpException('Not found', HttpStatus.NOT_FOUND);
		}
	}

	async update(id: string, data: Partial<UserDTO>) {
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
