import { Repository } from 'typeorm';
import { AppDataSource } from '../../data/data-source';
import { Sport } from '../../data/entity/Sport';
import HttpStatusCode from '../../enums/HttpStatusCode';
import { IHttpResponse } from '../../HttpModels/responseModels/IHttpResponse';
import { ISportService } from '../declaration/ISportService';

export class SportsService implements ISportService {
  private sportRepository: Repository<Sport>;

  constructor() {
    this.sportRepository = AppDataSource.getRepository(Sport);
  }

  public async getAll() {
    const allSports = await this.sportRepository.find({
      relations: {
        classes: true,
      },
    });

    let response: IHttpResponse<Sport[]>;
    if (allSports.length > 0) {
      response = {
        data: allSports,
        status: HttpStatusCode.OK,
        isError: false,
        message: '',
      };
    } else {
      response = {
        status: HttpStatusCode.NOT_FOUND,
        isError: true,
        message: 'Problem with loading all classes',
      };
    }

    return response;
  }

  public async findById(id: number) {
    const sport = await this.sportRepository.findOneBy({ id: id });

    let response: IHttpResponse<Sport>;
    if (!!sport) {
      response = {
        data: sport,
        status: HttpStatusCode.OK,
        isError: false,
        message: '',
      };
    } else {
      response = {
        status: HttpStatusCode.NOT_FOUND,
        isError: true,
        message: 'Problem with loading sport',
      };
    }

    return response;
  }
}
