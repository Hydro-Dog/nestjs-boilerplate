import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from '@nestjs/common';
import { UserDTO } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
	constructor(private userService: UserService) {}

	@Get()
	getAllUsers() {
		return this.userService.getAll();
	}

	@Get(':id')
	getUser(@Param('id') id: string) {
		return this.userService.get(id);
	}

	@Post()
	createUser(@Body() data: UserDTO) {
		return this.userService.create(data);
	}

	@Put('id')
	updateUser(@Param('id') id: string, @Body() data: Partial<UserDTO>) {
		return this.userService.update(id, data);
	}

	@Delete(':id')
	destroyUser(@Param('id') id: string) {
		this.userService.destroy(id);
	}
}
