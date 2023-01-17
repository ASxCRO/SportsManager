import { MigrationInterface, QueryRunner } from 'typeorm';

export default class verifiedUser implements MigrationInterface {
  name = 'verifiedUser';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "verified" boolean NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "verified"`);
  }
}
