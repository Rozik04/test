import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

describe('BookController', () => {
  let controller: BookController;
  let service: BookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [
        {
          provide: BookService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<BookController>(BookController);
    service = module.get<BookService>(BookService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call bookService.create() when create is called', async () => {
    const createBookDto: CreateBookDto = { name: 'Book Name', authorId: 1 };
    const result = { id: 1, name: 'Book Name', authorId: 1 };
    
    jest.spyOn(service, 'create').mockResolvedValue(result);

    expect(await controller.create(createBookDto)).toBe(result);
    expect(service.create).toHaveBeenCalledWith(createBookDto);
  });

  it('should call bookService.findAll() and return a list of books', async () => {
    const result = [
      { id: 1, name: 'Book 1', authorId: 1 },
      { id: 2, name: 'Book 2', authorId: 2 },
    ];

    jest.spyOn(service, 'findAll').mockResolvedValue(result);

    expect(await controller.findAll()).toBe(result);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should call bookService.findOne() and return a single book', async () => {
    const result = { id: 1, name: 'Book 1', authorId: 1 };

    jest.spyOn(service, 'findOne').mockResolvedValue(result);

    expect(await controller.findOne('1')).toBe(result);
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('should call bookService.update() when update is called', async () => {
    const UpdateBookDto: UpdateBookDto = {
      name: 'Updated Book Name',
      authorId: 0
    };
    const result = { id: 1, name: 'Updated Book Name', authorId: 1 };

    jest.spyOn(service, 'update').mockResolvedValue(result);

    expect(await controller.update('1', UpdateBookDto)).toBe(result);
    expect(service.update).toHaveBeenCalledWith(1, UpdateBookDto);
  });

  it('should call bookService.remove() when remove is called', async () => {
    const result = { id: 1, name: 'Book 1', authorId: 1 };

    jest.spyOn(service, 'remove').mockResolvedValue(result);

    expect(await controller.remove('1')).toBe(result);
    expect(service.remove).toHaveBeenCalledWith(1);
  });
});
