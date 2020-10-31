import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

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
    @Column('text') email: string;
    @Column('text') password: string;
    @Column('text') secret: string;
    @Column('text') innNumber: string;
    @Column('text') companyId: string;
    @Column('text') friendsIds: string;
    @Column('text') friendsRequestsIds: string;
    @Column('text') isActive: boolean;
}