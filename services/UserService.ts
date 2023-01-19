import dotenv from 'dotenv';
import { Repository } from 'typeorm';
import { AppDataSource } from '../data/data-source';
import { User } from '../data/entity/User';

dotenv.config();

export default class UserService {
  /**
   *
   */
  constructor(private userRepository: Repository<User>) {}

  public async all() {
    return await this.userRepository.find({
      relations: {
        classAppointments: true,
        classes: true,
      },
    });
  }

  public async findById(data: any) {
    return await this.userRepository.findOne({ where: { id: data.id } });
  }

  public async update(data: any) {
    const { name, id } = data;

    const user = await this.userRepository.findOneBy({ id: id });
    user.name = name;

    const newUser = await this.userRepository.save(user);
    return newUser;
  }

  public async delete(id: number) {
    return await this.userRepository.delete({ id: id });
  }
}
