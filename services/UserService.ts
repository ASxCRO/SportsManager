import dotenv from 'dotenv';

dotenv.config();

export default class UserService {
  public static async all() {
    // const allUsers = await this.prisma.user.findMany();
    // return allUsers;
  }

  public static async findById(id: number) {
    // const user = await this.prisma.user.findFirst({
    //   where: { id },
    // });
    // return user;
  }

  public static async update(data: any) {
    // const { name, email } = data;
    // const user = await this.prisma.user.update({
    //   where: { email },
    //   data: { name: name },
    // });
    // return user;
  }

  public static async delete(id: number) {
    // const user = await this.prisma.user.delete({
    //   where: {
    //     id,
    //   },
    // });
    // return user;
  }
}
