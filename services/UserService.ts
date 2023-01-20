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

  public async findById(data: any) {
    return await this.userRepository.findOneOrFail({ where: { id: data.id } });
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
      return await this.userRepository.delete({ id: id });
    }

    return {
      message: 'user with that id not found',
      status: 404,
      data: {},
    };
  }
}
