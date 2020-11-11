import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { PayloadInterface } from '../repository/payload-interface';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(UserRepository) private _userRepository: UserRepository,
    private _jwtService: JwtService,
  ) {
  }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this._userRepository.signUp(authCredentialsDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{accessToken:string}> {
    const username: string = await this._userRepository.validateUserPassword(authCredentialsDto);

    if (!username)
      throw new UnauthorizedException('Invalid credentials');

    const payload: PayloadInterface = { username };
    const accessToken: string = await this._jwtService.sign(payload);

    return { accessToken };
  }
}
