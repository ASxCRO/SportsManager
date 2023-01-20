import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from '../utils/jwt';
import { AppDataSource } from '../data/data-source';
import { User } from '../data/entity/User';
import { MailService } from './MailService';

dotenv.config();

export default class AuthService {
  private userRepository = AppDataSource.getRepository(User);

  public async register(data: any) {
    const { name, email, password } = data;

    const encryptedPassword = bcrypt.hashSync(password, 8);

    const user = new User();
    user.name = name;
    user.email = email;
    user.password = encryptedPassword;
    user.verified = false;
    await this.userRepository.save(user);

    data.password = null;
    data.accessToken = await jwt.signAccessToken(user);

    MailService.sendVerificationMail(user.email, user.name, data.accessToken);

    return data;
  }

  public async login(data: any) {
    const { email, password } = data;
    const user = await this.userRepository.findOneBy({
      email: email,
    });

    if (!user) {
      return {
        message: 'user not registered',
        status: 401,
        data: {},
      };
    }

    if (!user.verified) {
      return {
        message: 'account not verified',
        status: 401,
        data: {},
      };
    }

    const checkPassword = bcrypt.compareSync(password, user.password);
    if (!checkPassword)
      return {
        message: 'email or password not valid',
        status: 401,
        data: {},
      };
    const accessToken = await jwt.signAccessToken(user);
    return {
      message: 'login succesfull',
      status: 200,
      data: { ...user, accessToken },
    };
  }

  public async verify(token: string) {
    let userToVerify: User;
    await jwt
      .verifyAccessToken(token)
      .then((user: User) => {
        userToVerify = user;
      })
      .catch((e) => {
        return 'Token not active';
      });

    const userToVerifyDb = await this.userRepository.findOneBy({
      email: userToVerify.email,
    });
    userToVerifyDb.verified = true;
    await this.userRepository.save(userToVerifyDb);

    return 'Account verifed';
  }
}
