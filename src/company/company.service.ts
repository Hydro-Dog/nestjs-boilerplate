import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyDTO } from './company.dto';
import { CompanyEntity } from './company.entity';

@Injectable()
export class CompanySerevice {
	constructor(
		@InjectRepository(CompanyEntity)
		private companyRepository: Repository<CompanyEntity>,
	) {}

	async getAll(): Promise<Partial<CompanyDTO[]>> {
		const companies = await this.companyRepository.find();
		return companies;
	}

	async get(id: string): Promise<Partial<CompanyDTO[]>> {
		const company = await this.companyRepository.find({ where: { id } });
		if (!company) {
			throw new HttpException('Not found', HttpStatus.NOT_FOUND);
		}
		return company;
	}

	async create(data: CompanyDTO) {
		const { name } = data;
		const { adminId } = data;

		let company = await this.companyRepository.findOne({ where: { name } });

		if (company) {
			throw new HttpException(
				'Company name already registered',
				HttpStatus.BAD_REQUEST,
			);
		}

		company = await this.companyRepository.findOne({ where: { adminId } });

		if (company) {
			throw new HttpException(
				'Admin already attached to another company',
				HttpStatus.BAD_REQUEST,
			);
		}

		company = await this.companyRepository.create(data);
		await this.companyRepository.save(company);
		return company;
	}
}
