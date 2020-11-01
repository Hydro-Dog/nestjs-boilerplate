import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './user.controller';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity])], //get us access to typeorm and entities we pass to it in the current module
	controllers: [UserController],
	providers: [UserService],
})
export class UserModule {}
