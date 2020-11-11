import { companyType } from 'src/shared/types/companyType.type';
import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity('company')
export class CompanyEntity {
	@PrimaryGeneratedColumn('uuid') id: string;
	@CreateDateColumn() created: Date;
	@UpdateDateColumn() updated: Date;
	@Column('text') type: companyType;
	@Column({ type: 'text', unique: true }) name: string;
	@Column({ type: 'text', unique: true }) adminId: string;
	@Column('text', { array: true }) staffIds: string[];
	@Column('text') companySpaceId: string;
	@Column('text') companyPic: string;
	@Column('text') adress: string;
	@Column('text') phoneNumber: string;
	@Column('text', { array: true }) subscribersIds: string[];
	@Column('text', { array: true }) socialMedia: string[];
	@Column('text', { array: true }) rating: string[];
	@Column('text', { array: true }) tags: string[];
}
