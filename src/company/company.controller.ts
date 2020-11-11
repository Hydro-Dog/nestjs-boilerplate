import {
	Body,
	Controller,
	Delete,
	Get,
	Post,
	Put,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { CompanyDTO } from './company.dto';
import { CompanySerevice } from './company.service';

@Controller('api/company')
export class CompanyController {
	constructor(private companyService: CompanySerevice) {}

	@Post()
	@UsePipes(new ValidationPipe())
	createCompany(@Body() data: CompanyDTO) {
		return this.companyService.create(data);
	}

	@Get()
	getAllCompanies() {}

	@Get(':id')
	getCompany() {}

	@Put(':id')
	@UsePipes(new ValidationPipe())
	updateCompany() {}

	@Delete(':id')
	destroyCompany() {}
}
