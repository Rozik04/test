import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { AuthorModule } from './author/author.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [BookModule, AuthorModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
