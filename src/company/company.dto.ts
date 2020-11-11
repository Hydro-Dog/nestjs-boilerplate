import { IsArray, IsString } from 'class-validator';
import { companyType } from 'src/shared/types/companyType.type';

export class CompanyDTO {
	@IsString()
	type: companyType;

	@IsString()
	name: string;

	@IsString()
	adminId: string;

	@IsArray()
	staffIds: string[];

	@IsString()
	companySpaceId: string;

	@IsString()
	companyPic: string;

	@IsString()
	adress: string;

	@IsString()
	phoneNumber: string;

	@IsArray()
	subscribersIds: string[];

	@IsArray()
	socialMedia: string[];

	@IsArray()
	rating: string[];

	@IsArray()
	tags: string[];
}
