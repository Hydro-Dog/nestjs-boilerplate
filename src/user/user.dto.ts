export interface UserDTO {
	role: 'admin' | 'user' | 'staff' | 'superadmin';
	subrole: string;
	firstName: string;
	secondName: string;
	lastName: string;
	userPic: string;
	phoneNumber: string;
	email: string;
	password: string;
	secret: string;
	innNumber: string;
	companyId: string;
	friendsIds: string;
	friendsRequestsIds: string;
	isActive: boolean;
}
