import {
	BeforeInsert,
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { userRole } from 'src/shared/types/userRole.type';

//pass name to the @Entity() decorator to specify db table name --------------------------
@Entity('user')
export class UserEntity {
	@PrimaryGeneratedColumn('uuid') id: string;
	@CreateDateColumn() created: Date;
	@UpdateDateColumn() updated: Date;
	@Column('text') role: userRole;
	@Column('text') subrole: string;
	@Column('text') firstName: string;
	@Column('text') secondName: string;
	@Column('text') lastName: string;
	@Column('text') userPic: string;
	@Column('text') phoneNumber: string;
	@Column({ type: 'text', unique: true }) email: string;
	@Column('text') password: string;
	@Column('text') secret: string;
	@Column('text') lang: string;
	@Column('text') companyId: string;
	@Column('text') friendsIds: string[];
	@Column('text') friendsRequestsIds: string[];
	@Column('text') isActive: boolean;

	@BeforeInsert()
	async hashPassword() {
		this.password = await bcrypt.hash(this.password, 10);
	}

	toResponseObject(addToken = false, secret = '') {
		const resObj: any = { ...this };
		delete resObj.password;
		if (addToken && secret) {
			resObj.authToken = this.getAuthToken(secret);
			resObj.refreshToken = this.getRefreshToken(secret);
		}
		return resObj;
	}

	async comparePassword(attempt: string) {
		return await bcrypt.compare(attempt, this.password);
	}

	private getAuthToken(secret) {
		const { id } = this;
		return jwt.sign({ id }, secret, { expiresIn: '5m' });
	}

	private getRefreshToken(secret) {
		const { id } = this;
		return jwt.sign({ id }, secret, { expiresIn: '10m' });
	}
}
