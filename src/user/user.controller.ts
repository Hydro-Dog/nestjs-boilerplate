import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	UseGuards,
	UsePipes,
} from '@nestjs/common';
import { AuthGuard } from 'src/shared/guards/auth2.guard';
import { ValidationPipe } from 'src/shared/validation.pipe';
import { UserDTO } from './user.dto';
import { UserService } from './user.service';

// pass route name to the @Controller decorator -----------------------------------------------
@Controller('api/user')
export class UserController {
	constructor(private userService: UserService) {}

	@Post('login')
	@UsePipes(new ValidationPipe()) //validate this endpoint with ValidationPipe ------------
	login(@Body() data: Partial<UserDTO>) {
		return this.userService.login(data);
	}

	@Post('register')
	@UsePipes(new ValidationPipe())
	register(@Body() data: UserDTO) {
		return this.userService.register(data);
	}

	@Get()
	@UseGuards(AuthGuard)
	getAllUsers() {
		return this.userService.getAll();
	}

	@Get(':id')
	getUser(@Param('id') id: string) {
		console.log('getUser id: ', id);
		return this.userService.get(id);
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
