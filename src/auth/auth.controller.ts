import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

  constructor(
    private _authService: AuthService
  ) {
  }

  @Post("/sign-up")
  async signUp(@Body(ValidationPipe) authCredentials: AuthCredentialsDto): Promise<void>{
    await this._authService.signUp(authCredentials)
  }

  @Post("/sign-in")
  async signIn(@Body(ValidationPipe) authCredentials: AuthCredentialsDto):Promise<{accessToken: string}>{
    return this._authService.signIn(authCredentials);
  }
}
