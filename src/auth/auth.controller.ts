import { Body, Controller, Post, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('register')
  async register(@Body() body: { email: string; password: string; name?: string }) {
    try {
      const user = await this.auth.register(body.email, body.password, body.name);
      return { id: user.id, email: user.email, name: user.name };
    } catch (e) {
      throw new BadRequestException(e.message || 'Registration failed');
    }
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.auth.validateUser(body.email, body.password);
    if (!user) throw new BadRequestException('Invalid credentials');
    return this.auth.login(user);
  }
}
