import { AppDataSource } from '../data/data-source';
import { Class } from '../data/entity/Class';
import { ClassAppointment } from '../data/entity/ClassAppointment';
import { Review } from '../data/entity/Review';
import { Sport } from '../data/entity/Sport';

export class AdminService {
  private sportRepository = AppDataSource.getRepository(Sport);
  private classRepository = AppDataSource.getRepository(Class);
  private classAppointmentRepository =
    AppDataSource.getRepository(ClassAppointment);
  private reviewRepository = AppDataSource.getRepository(Review);

  public async createClass(data: any) {
    const { description, ageGroup, sportId, duration } = data;

    const classs = new Class();
    classs.description = description;
    classs.ageGroup = ageGroup;
    classs.sport = await this.sportRepository.findOneByOrFail({ id: sportId });
    classs.duration = duration;

    const newClass = await this.classRepository.save(classs);

    return newClass;
  }

  public async updateClass(data: any) {
    const { description, ageGroup, sportId, duration, classId } = data;

    const classs = await this.classRepository.findOneByOrFail({ id: classId });
    classs.description = description;
    classs.ageGroup = ageGroup;
    classs.sport = await this.sportRepository.findOneByOrFail({ id: sportId });
    classs.duration = duration;

    const newClass = await this.classRepository.save(classs);
    return newClass;
  }

  public async deleteClass(id: number) {
    return await this.classRepository.delete({ id: id });
  }

  public async createClassAppointment(data: any) {
    const { description, classId, dateStarting } = data;

    const classsApp = new ClassAppointment();
    classsApp.description = description;
    classsApp.dateStarting = dateStarting;
    classsApp.classs = await this.classRepository.findOneByOrFail({
      id: classId,
    });

    const newClassApp = await this.classAppointmentRepository.save(classsApp);

    return newClassApp;
  }

  public async updateClassAppointment(data: any) {
    const { description, classId, dateStarting, classAppointmentId } = data;

    const classsApp = await this.classAppointmentRepository.findOneByOrFail({
      id: classAppointmentId,
    });
    classsApp.dateStarting = dateStarting;
    classsApp.classs = await this.classRepository.findOneByOrFail({
      id: classId,
    });
    classsApp.description = description;

    const newClassApp = await this.classAppointmentRepository.save(classsApp);
    return newClassApp;
  }

  public async deleteClassAppointment(id: number) {
    const classAppExists = await this.classAppointmentRepository.exist({
      where: {
        id: id,
      },
    });

    if (!classAppExists) {
      return {
        message: 'class appoinment with that id does not exist',
        status: 422,
        data: {},
      };
    }

    await this.classAppointmentRepository.delete({ id: id });

    return {
      message: 'deleted',
      status: 200,
      data: {},
    };
  }

  public async readReviews() {
    return await this.reviewRepository.find({
      relations: {
        class: true,
      },
    });
  }
}
