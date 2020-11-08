import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('refresh')
	refresh(@Body() data: { id: string; refresh: string }) {
		return this.authService.refresh(data.id, data.refresh);
	}
}
