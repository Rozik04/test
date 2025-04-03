import { Test, TestingModule } from '@nestjs/testing';
import { AuthorService } from './author.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

describe('AuthorService', () => {
  let authorService: AuthorService;
  let prismaService: PrismaService;

  // Mocking PrismaService
  const mockPrismaService = {
    author: {
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
      AuthorService,
      { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    authorService = module.get<AuthorService>(AuthorService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(authorService).toBeDefined();
  });

  describe('create', () => {
    it('should create an author', async () => {
    const createAuthorDto: CreateAuthorDto = { name: 'John Doe' };
    const createdAuthor = { id: 1, name: 'John Doe' };

    mockPrismaService.author.create.mockResolvedValue(createdAuthor);

    const result = await authorService.create(createAuthorDto);

    expect(result).toEqual(createdAuthor);
    expect(mockPrismaService.author.create).toHaveBeenCalledWith({
      data: createAuthorDto,
      });
    });
  });

  describe('findAll', () => {
  it('should return all authors', async () => {
      const authors = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Doe' },
      ];

      mockPrismaService.author.findMany.mockResolvedValue(authors);

      const result = await authorService.findAll();

      expect(result).toEqual(authors);
      expect(mockPrismaService.author.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
  it('should return one author', async () => {
  const author = { id: 1, name: 'John Doe' };

    mockPrismaService.author.findFirst.mockResolvedValue(author);

    const result = await authorService.findOne(1);

    expect(result).toEqual(author);
    expect(mockPrismaService.author.findFirst).toHaveBeenCalledWith({
    where: { id: 1 },
    });
    });
  });

  describe('update', () => {
    it('should update an author', async () => {
      const updateAuthorDto: UpdateAuthorDto = { name: 'John Updated' };
      const updatedAuthor = { id: 1, name: 'John Updated' };

      mockPrismaService.author.update.mockResolvedValue(updatedAuthor);

      const result = await authorService.update(1, updateAuthorDto);

      expect(result).toEqual(updatedAuthor);
      expect(mockPrismaService.author.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateAuthorDto,
      });
    });
  });

  describe('remove', () => {
    it('should remove an author', async () => {
      const deletedAuthor = { id: 1, name: 'John Doe' };

      mockPrismaService.author.delete.mockResolvedValue(deletedAuthor);

      const result = await authorService.remove(1);

      expect(result).toEqual(deletedAuthor);
      expect(mockPrismaService.author.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });
});
