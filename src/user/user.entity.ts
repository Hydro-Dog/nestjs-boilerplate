import {
	BeforeInsert,
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

//pass name to the @Entity() decorator to specify db table name --------------------------
@Entity('user')
export class UserEntity {
	@PrimaryGeneratedColumn('uuid') id: string;
	@CreateDateColumn() created: Date;
	@Column('text') role: 'admin' | 'user' | 'staff' | 'superadmin';
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
	@Column('text') friendsIds: string;
	@Column('text') friendsRequestsIds: string;
	@Column('text') isActive: boolean;

	@BeforeInsert()
	async hashPassword() {
		this.password = await bcrypt.hash(this.password, 10);
	}

	@BeforeInsert()
	generateSecret() {
		const secret = Math.random()
			.toString(36)
			.slice(-8);
		this.secret = secret;
	}

	toResponseObject(addToken = true) {
		const resObj: any = { ...this };
		delete resObj.password;
		delete resObj.secret;
		if (addToken) {
			resObj.authToken = this.authToken;
			resObj.refreshToken = this.refreshToken;
		}
		return resObj;
	}

	async comparePassword(attempt: string) {
		return await bcrypt.compare(attempt, this.password);
	}

	private get authToken() {
		const { id } = this;
		return jwt.sign({ id }, this.secret, { expiresIn: '5m' });
	}

	private get refreshToken() {
		const { id } = this;
		return jwt.sign({ id }, this.secret, { expiresIn: '10m' });
	}
}
