import { Test, TestingModule } from '@nestjs/testing';
import { AuthorController } from './author.controller';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

describe('AuthorController', () => {
  let authorController: AuthorController;
  let authorService: AuthorService;

  const mockAuthorService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthorController],
      providers: [
        {
          provide: AuthorService,
          useValue: mockAuthorService,
        },
      ],
    }).compile();

    authorController = module.get<AuthorController>(AuthorController);
    authorService = module.get<AuthorService>(AuthorService);
  });

  it('should be defined', () => {
    expect(authorController).toBeDefined();
  });

  describe('create', () => {
    it('should call AuthorService.create and return the result', async () => {
      const createAuthorDto: CreateAuthorDto = { name: 'John Doe' };
      const createdAuthor = { id: 1, name: 'John Doe' };

      mockAuthorService.create.mockResolvedValue(createdAuthor);

      const result = await authorController.create(createAuthorDto);

      expect(result).toEqual(createdAuthor);
      expect(mockAuthorService.create).toHaveBeenCalledWith(createAuthorDto);
    });
  });

  describe('findAll', () => {
    it('should call AuthorService.findAll and return a list of authors', async () => {
      const authors = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Doe' },
      ];

      mockAuthorService.findAll.mockResolvedValue(authors);

      const result = await authorController.findAll();

      expect(result).toEqual(authors);
      expect(mockAuthorService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should call AuthorService.findOne and return a single author', async () => {
      const author = { id: 1, name: 'John Doe' };

      mockAuthorService.findOne.mockResolvedValue(author);

      const result = await authorController.findOne('1');

      expect(result).toEqual(author);
      expect(mockAuthorService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should call AuthorService.update and return the updated author', async () => {
      const updateAuthorDto: UpdateAuthorDto = { name: 'John Updated' };
      const updatedAuthor = { id: 1, name: 'John Updated' };

      mockAuthorService.update.mockResolvedValue(updatedAuthor);

      const result = await authorController.update('1', updateAuthorDto);

      expect(result).toEqual(updatedAuthor);
      expect(mockAuthorService.update).toHaveBeenCalledWith(1, updateAuthorDto);
    });
  });

  describe('remove', () => {
    it('should call AuthorService.remove and return the deleted author', async () => {
      const deletedAuthor = { id: 1, name: 'John Doe' };

      mockAuthorService.remove.mockResolvedValue(deletedAuthor);

      const result = await authorController.remove('1');

      expect(result).toEqual(deletedAuthor);
      expect(mockAuthorService.remove).toHaveBeenCalledWith(1);
    });
  });
});
