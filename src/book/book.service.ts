import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookService {
constructor(private readonly prisma:PrismaService){}

  async create(createBookDto: CreateBookDto) {
    let data = await this.prisma.book.create({data:createBookDto})
    return data
  }

  async findAll() {
    let data = await this.prisma.book.findMany({select:{name:true, author:{select:{name:true}}}})
    return data
  }

  async findOne(id: number) {
    let data = await this.prisma.book.findFirst({where:{id},select:{name:true, author:{select:{name:true}}}})
    return data
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    let data = await this.prisma.book.update({where:{id}, data:updateBookDto});
    return data
  }

  async remove(id: number) {
    let data = await this.prisma.book.delete({where:{id}});
    return data
  }
}
