import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from "bcrypt"

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const salt:string = await bcrypt.genSalt();
    const user: UserEntity = new UserEntity();

    user.username = authCredentialsDto.username;
    user.salt = salt;
    user.password = await this._hashPassword(authCredentialsDto.password,salt);

    console.log(user.password)
    try {
      await user.save();
    } catch (e) {
      if(e.code=== "ER_DUP_ENTRY")
        throw new ConflictException("Username already exist")

      throw new InternalServerErrorException()
    }

  }

  async validateUserPassword(authCredentialsDto: AuthCredentialsDto):Promise<string>{
    const user: UserEntity = await this.findOne({username: authCredentialsDto.username});

    if(user && await user.validatePassword(authCredentialsDto.password))
      return user.username;

    return null;
  }

  private async _hashPassword(psw:string, salt:string):Promise<string>{
    return bcrypt.hash(psw,salt)
  }

}
