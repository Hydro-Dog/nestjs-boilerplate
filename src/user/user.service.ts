import { Injectable } from '@nestjs/common';
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
		return await this.userRepository.findOne({ where: { id } });
	}

	async update(id: string, data: Partial<UserDTO>) {
		await this.userRepository.update({ id }, data);
		return this.userRepository.findOne({ where: { id } });
	}

	async destroy(id: string) {
		await this.userRepository.delete({ id });
		return { deleted: true };
	}
}
