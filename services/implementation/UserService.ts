import { Repository } from 'typeorm';
import { AppDataSource } from '../../data/data-source';
import { User } from '../../data/entity/User';
import HttpStatusCode from '../../enums/HttpStatusCode';
import { IUserUpdateRequest } from '../../HttpModels/requestModels/User/IUserUpdateRequest';
import { IHttpResponse } from '../../HttpModels/responseModels/IHttpResponse';
import { IUserService } from '../declaration/IUserService';

export class UserService implements IUserService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  public async all() {
    const allUsers = await this.userRepository.find({
      relations: {
        classAppointments: true,
        classes: true,
      },
    });

    let response: IHttpResponse<User[]>;
    if (allUsers.length > 0) {
      response = {
        data: allUsers,
        status: HttpStatusCode.OK,
        isError: false,
        message: '',
      };
    } else {
      response = {
        status: HttpStatusCode.INTERNAL_SERVER_ERROR,
        isError: true,
        message: 'Problem with loading all users',
      };
    }

    return response;
  }

  public async findById(id: number) {
    const user = await this.userRepository.findOne({
      where: { id: id },
      relations: { classAppointments: true, classes: true },
    });

    let response: IHttpResponse<User>;
    if (!!user) {
      response = {
        data: user,
        status: HttpStatusCode.OK,
        isError: false,
        message: '',
      };
    } else {
      response = {
        status: HttpStatusCode.INTERNAL_SERVER_ERROR,
        isError: true,
        message: 'Problem with loading user',
      };
    }

    return response;
  }

  public async findByAppointmentId(id: number) {
    const users = await AppDataSource.getRepository(User)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.classAppointments', 'classAppointments')
      .where('classAppointments.id = :id', { id: id })
      .getMany();

    let response: IHttpResponse<User[]>;
    if (!!users) {
      response = {
        data: users,
        status: HttpStatusCode.OK,
        isError: false,
        message: '',
      };
    } else {
      response = {
        status: HttpStatusCode.INTERNAL_SERVER_ERROR,
        isError: true,
        message: 'Problem with loading users',
      };
    }

    return response;
  }

  public async findByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email: email });

    let response: IHttpResponse<User>;
    if (!!user) {
      response = {
        data: user,
        status: HttpStatusCode.OK,
        isError: false,
        message: '',
      };
    } else {
      response = {
        status: HttpStatusCode.INTERNAL_SERVER_ERROR,
        isError: true,
        message: 'Problem with loading user',
      };
    }

    return response;
  }

  public async update(userUpdateRequest: IUserUpdateRequest) {
    const { name, id } = userUpdateRequest;

    const user = await this.userRepository.findOneBy({ id: id });

    let response: IHttpResponse<User>;
    if (!!user) {
      user.name = name;
      const updateUser = await this.userRepository.save(user);

      response = {
        data: updateUser,
        status: HttpStatusCode.OK,
        isError: false,
        message: '',
      };
    } else {
      response = {
        status: HttpStatusCode.INTERNAL_SERVER_ERROR,
        isError: true,
        message: 'User not in db',
      };
    }

    return response;
  }

  public async delete(id: number) {
    const userExists = await this.userRepository.exist({
      where: {
        id: id,
      },
    });

    let response: IHttpResponse;
    if (userExists) {
      await this.userRepository.delete({ id: id });

      response = {
        data: null,
        status: HttpStatusCode.OK,
        isError: false,
        message: '',
      };
    } else {
      response = {
        status: HttpStatusCode.INTERNAL_SERVER_ERROR,
        isError: true,
        message: 'Problem with deleting user',
      };
    }

    return response;
  }

  public async exists(email: string) {
    const userExists = await this.userRepository.exist({
      where: {
        email: email,
      },
    });

    let response: IHttpResponse<boolean>;
    if (userExists) {
      response = {
        data: userExists,
        status: HttpStatusCode.INTERNAL_SERVER_ERROR,
        isError: true,
        message: userExists ? 'user with that email already exists' : '',
      };
    } else {
      response = {
        data: userExists,
        status: HttpStatusCode.OK,
        isError: false,
        message: 'Problem with checking user existance',
      };
    }

    return response;
  }

  public async create(user: User) {
    const createdUser = this.userRepository.create(user);

    let response: IHttpResponse<User>;
    if (!!createdUser) {
      response = {
        data: createdUser,
        status: HttpStatusCode.OK,
        isError: false,
        message: '',
      };
    } else {
      response = {
        status: HttpStatusCode.INTERNAL_SERVER_ERROR,
        isError: true,
        message: 'Problem with deleting user',
      };
    }

    return response;
  }
}
