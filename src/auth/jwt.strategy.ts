import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PayloadInterface } from '../repository/payload-interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserEntity } from './user.entity';
import { UnauthorizedException } from '@nestjs/common';


export class JwtStrategy extends PassportStrategy(Strategy){

  constructor(
    @InjectRepository(UserRepository) private _userRepository: UserRepository
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:"topSecret51",
    });
  }

  async validate(payload: PayloadInterface):Promise<UserEntity>{

    const user: UserEntity = await this._userRepository.findOne({username:payload.username});

    if(!user)
      throw new UnauthorizedException();

    return user
  }
}
