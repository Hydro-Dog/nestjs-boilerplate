import {
	BeforeInsert,
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

//pass name to the @Entity() decorator to specify db table  name --------------------------
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
	@Column('text') innNumber: string;
	@Column('text') companyId: string;
	@Column('text') friendsIds: string;
	@Column('text') friendsRequestsIds: string;
	@Column('text') isActive: boolean;

	@BeforeInsert()
	async hashPassword() {
		this.password = await bcrypt.hash(this.password, 10);
	}

	toResponseObject(showToken = true) {
		const resObj = { ...this };
		console.log('resObj: ', resObj);
		delete resObj.password;
		if (showToken) {
			resObj.token = this.token;
		}
		return resObj;
	}

	async comparePassword(attempt: string) {
		return await bcrypt.compare(attempt, this.password);
	}

	private get token() {
		const { id } = this;
		return jwt.sign({ id }, process.env.SECRET, { expiresIn: '7d' });
	}

	private set token(val) {
		this.token = val;
	}
}
