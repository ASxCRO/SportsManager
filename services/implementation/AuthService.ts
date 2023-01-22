import bcrypt from 'bcryptjs';
import jwt from '../../utils/jwt';
import { User } from '../../data/entity/User';
import { MailService } from './MailService';
import { UserService } from './UserService';
import { IAuthService } from '../declaration/IAuthService';
import { ILoginRequest } from '../../HttpModels/requestModels/Auth/ILoginRequest';
import { IRegisterRequest } from '../../HttpModels/requestModels/Auth/IRegisterRequest';
import { IHttpResponse } from '../../HttpModels/responseModels/IHttpResponse';
import HttpStatusCode from '../../enums/HttpStatusCode';
import { IUserUpdateRequest } from '../../HttpModels/requestModels/User/IUserUpdateRequest';

export class AuthService implements IAuthService {
  private userService: UserService;
  private mailService: MailService;

  constructor() {
    this.userService = new UserService();
    this.mailService = new MailService();
  }

  public async register(registerRequest: IRegisterRequest) {
    const { name, email, password } = registerRequest;

    const responseUserExists = await this.userService.exists(email);

    let response: IHttpResponse<any>;

    if (!responseUserExists.isError)
      if (!responseUserExists.data) {
        response = {
          data: {},
          status: HttpStatusCode.BAD_REQUEST,
          isError: true,
          message: 'User with this mail already exists',
        };
        return response;
      }

    const encryptedPassword = bcrypt.hashSync(password, 8);

    const user = new User();
    user.name = name;
    user.email = email;
    user.password = encryptedPassword;
    user.verified = false;

    const createdUserResponse = await this.userService.create(user);

    if (!createdUserResponse.isError) {
      user.password = null;
      const accessTokenJwt = await jwt.signAccessToken(user);
      const accessToken = accessTokenJwt.toString();

      this.mailService.sendVerificationMail(user.email, user.name, accessToken);

      const data = { ...user, accessToken };

      response = {
        data: data,
        status: HttpStatusCode.OK,
        isError: false,
        message: '',
      };
    } else {
      response = {
        status: HttpStatusCode.BAD_REQUEST,
        isError: true,
        message: 'Problem with registering new user',
      };
    }

    return response;
  }

  public async login(loginRequest: ILoginRequest) {
    const { email, password } = loginRequest;
    const userResponse = await this.userService.findByEmail(email);
    let response: IHttpResponse<any>;
    let user;

    if (!userResponse.isError) {
      user = userResponse.data;
    }

    if (!user) {
      response = {
        status: HttpStatusCode.NOT_FOUND,
        isError: true,
        message: 'User not found',
      };

      return response;
    }

    if (!user.verified) {
      response = {
        status: HttpStatusCode.NOT_ACCEPTABLE,
        isError: true,
        message: 'User not verified',
      };

      return response;
    }

    const checkPassword = bcrypt.compareSync(password, user.password);
    if (!checkPassword) {
      response = {
        status: HttpStatusCode.UNAUTHORIZED,
        isError: true,
        message: 'email or password not valid',
      };

      return response;
    }
    const accessToken = await jwt.signAccessToken(user);
    response = {
      status: HttpStatusCode.OK,
      isError: false,
      message: 'login successful',
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

    let response: IHttpResponse<any>;

    const userToVerifyDbResponse = await this.userService.findByEmail(
      userToVerify.email
    );

    if (!userToVerifyDbResponse.isError) {
      const userToVerifyDb = userToVerifyDbResponse.data;
      const userUpdateModel: IUserUpdateRequest = {
        verified: true,
        id: userToVerifyDb.id,
        name: userToVerifyDb.name,
      };

      const userUpdateResponse = await this.userService.update(userUpdateModel);

      if (!userUpdateResponse.isError) {
        response = {
          status: HttpStatusCode.OK,
          isError: false,
          message: 'verify successful',
          data: userUpdateResponse.data,
        };
      }
    } else {
      response = {
        status: HttpStatusCode.BAD_REQUEST,
        isError: true,
        message: "couldn't verify",
      };
    }

    return response;
  }
}
