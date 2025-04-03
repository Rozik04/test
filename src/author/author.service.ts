import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthorService {
  constructor(private readonly prisma:PrismaService){}


  async create(createAuthorDto: CreateAuthorDto) {
    let datas = await this.prisma.author.create({data:createAuthorDto,});
    return datas
  }

  async findAll() {
    let datas = await this.prisma.author.findMany();
    return datas
  }

  async findOne(id: number) {
    let data = await this.prisma.author.findFirst({where:{id}});
    return data
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    let data = await this.prisma.author.update({where:{id}, data:updateAuthorDto})
    return data
  }

  async remove(id: number) {
    let data = await this.prisma.author.delete({where:{id}});
    return data
  }
}
