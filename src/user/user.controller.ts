import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	UsePipes,
} from '@nestjs/common';
import { ValidationPipe } from 'src/shared/validation.pipe';
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
		console.log('getUser id: ', id);
		return this.userService.get(id);
	}

	@Post()
	@UsePipes(new ValidationPipe()) //validate this endpoint with ValidationPipe ----------------
	createUser(@Body() data: UserDTO) {
		return this.userService.create(data);
	}

	@Put(':id')
	@UsePipes(new ValidationPipe())
	updateUser(@Param('id') id: string, @Body() data: Partial<UserDTO>) {
		return this.userService.update(id, data);
	}

	@Delete(':id')
	destroyUser(@Param('id') id: string) {
		return this.userService.destroy(id);
	}
}
