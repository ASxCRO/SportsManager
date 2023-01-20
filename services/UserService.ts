import { AppDataSource } from '../data/data-source';
import { User } from '../data/entity/User';

export class UserService {
  private userRepository = AppDataSource.getRepository(User);

  public async all() {
    return await this.userRepository.find({
      relations: {
        classAppointments: true,
        classes: true,
      },
    });
  }

  public async findById(id: number) {
    return await this.userRepository.findOneByOrFail({ id: id });
  }

  public async update(data: any) {
    const { name, id } = data;

    const user = await this.userRepository.findOneByOrFail({ id: id });
    user.name = name;

    const newUser = await this.userRepository.save(user);
    return newUser;
  }

  public async delete(id: number) {
    const userExists = await this.userRepository.exist({
      where: {
        id: id,
      },
    });

    if (userExists) {
      await this.userRepository.delete({ id: id });

      return {
        message: 'user deleted',
        status: 200,
        data: {},
      };
    }

    return {
      message: 'user with that id not found',
      status: 404,
      data: {},
    };
  }
}
