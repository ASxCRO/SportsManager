import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from '../utils/jwt';
import { AppDataSource } from '../data/data-source';
import { User } from '../data/entity/User';
import sgMail from '@sendgrid/mail';

dotenv.config();

export default class AuthService {
  public static userRepository = AppDataSource.getRepository(User);
  public static async register(data: any) {
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

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: email,
      from: 'antonio.suups@gmail.com',
      subject: 'Verification mail',
      text: 'Click below to confirm your mail',
      html: `<strong>Confirm your account by following this link<a href="localhost:3322/api/auth/verify?token=${data.accessToken}">Confirm/a></strong>`,
    };

    sgMail
      .send(msg)
      .then((response) => {
        console.log(response[0].statusCode);
        console.log(response[0].headers);
      })
      .catch((error) => {
        console.error(error);
      });

    return data;
  }

  public static async login(data: any) {
    const { email, password } = data;
    const user = await this.userRepository.findOneBy({
      email: email,
    });
    if (!user) {
      return 'User not registered';
    }
    const checkPassword = bcrypt.compareSync(password, user.password);
    if (!checkPassword) return 'Email address or password not valid';
    const accessToken = await jwt.signAccessToken(user);
    return { ...user, accessToken };
  }

  public static async verify(token: string) {
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
  }
}
