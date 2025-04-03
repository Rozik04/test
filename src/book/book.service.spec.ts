import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('BookService', () => {
  let service: BookService;
  let prisma: PrismaService;

  const mockPrismaService = {
    book: {
      create: jest.fn(),
      findMany: jest.fn(),
      findFirst: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<BookService>(BookService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new book', async () => {
      const createBookDto = { name: 'New Book', authorId: 1 };
      const result = { id: 1, name: 'New Book', authorId: 1 };

      prisma.book.create.mockResolvedValue(result);

      expect(await service.create(createBookDto)).toEqual(result);
      expect(prisma.book.create).toHaveBeenCalledWith({ data: createBookDto });
    });
  });

  describe('findAll', () => {
    it('should return an array of books', async () => {
      const result = [
        { name: 'Book 1', author: { name: 'Author 1' } },
        { name: 'Book 2', author: { name: 'Author 2' } },
      ];

      prisma.book.findMany.mockResolvedValue(result);

      expect(await service.findAll()).toEqual(result);
      expect(prisma.book.findMany).toHaveBeenCalledWith({
        select: { name: true, author: { select: { name: true } } },
      });
    });
  });

  describe('findOne', () => {
    it('should return a single book by id', async () => {
      const result = { name: 'Book 1', author: { name: 'Author 1' } };
      const id = 1;

      prisma.book.findFirst.mockResolvedValue(result);

      expect(await service.findOne(id)).toEqual(result);
      expect(prisma.book.findFirst).toHaveBeenCalledWith({
        where: { id },
        select: { name: true, author: { select: { name: true } } },
      });
    });
  });

  describe('update', () => {
    it('should update an existing book', async () => {
      const id = 1;
      const updateBookDto = { name: 'Updated Book Name' };
      const result = { id, name: 'Updated Book Name', authorId: 1 };

      prisma.book.update.mockResolvedValue(result);

      expect(await service.update(id, updateBookDto)).toEqual(result);
      expect(prisma.book.update).toHaveBeenCalledWith({
        where: { id },
        data: updateBookDto,
      });
    });
  });

  describe('remove', () => {
    it('should remove a book', async () => {
      const id = 1;
      const result = { id, name: 'Book 1', authorId: 1 };

      prisma.book.delete.mockResolvedValue(result);

      expect(await service.remove(id)).toEqual(result);
      expect(prisma.book.delete).toHaveBeenCalledWith({ where: { id } });
    });
  });
});
