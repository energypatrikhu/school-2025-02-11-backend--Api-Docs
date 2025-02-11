import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CatsService {
  constructor(private db: PrismaService) {}

  create(createCatDto: CreateCatDto) {
    return this.db.cat.create({ data: createCatDto });
  }

  findAll() {
    return this.db.cat.findMany();
  }

  async findOne(id: number) {
    try {
      return await this.db.cat.findUniqueOrThrow({ where: { id } });
    } catch (error) {
      throw new BadRequestException('Cat not found');
    }
  }

  async update(id: number, updateCatDto: UpdateCatDto) {
    try {
      return await this.db.cat.update({ where: { id }, data: updateCatDto });
    } catch (error) {
      throw new BadRequestException('Cat not found');
    }
  }

  async remove(id: number) {
    try {
      await this.db.cat.delete({ where: { id } });
    } catch (error) {
      throw new BadRequestException('Cat not found');
    }
    return;
  }
}
