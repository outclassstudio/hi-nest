import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  //테스트 실행시 공통으로 적용됨
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // afterAll(()=>{}) afterEach ....

  describe('getAll', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should exist a movie', () => {
      const movie = {
        title: 'topgun',
        year: 2022,
        genres: ['action'],
      };
      service.createMovie(movie);
      const afterMovie = service.getOne(1);

      expect(afterMovie).toBeDefined();
    });

    it('should throw 404 error', () => {
      try {
        service.getOne(9999);
        //?error를 전달해야 함
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Movie with ID 9999 not found');
      }
    });
  });

  describe('createMovie', () => {
    it('after should be larger than before', () => {
      const before = service.getAll().length;
      service.createMovie({
        title: 'topgun',
        year: 2022,
        genres: ['action'],
      });
      const after = service.getAll().length;

      expect(after).toBeGreaterThan(before);
    });
  });

  describe('deleteOne', () => {
    it('after should be shorter than before', () => {
      service.createMovie({
        title: 'topgun',
        year: 2022,
        genres: ['action'],
      });
      const before = service.getAll().length;
      service.deleteOne(1);
      const after = service.getAll().length;
      expect(after).toBeLessThan(before);
    });

    it('should return 404', () => {
      try {
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('update', () => {
    it('should update a movie', () => {
      service.createMovie({
        title: 'topgun',
        year: 2022,
        genres: ['action'],
      });
      service.update(1, { title: 'topgun:maverick' });
      const movie = service.getOne(1);
      expect(movie.title).toEqual('topgun:maverick');
    });

    it('should throw a NotFoundException', () => {
      try {
        service.update(999, {});
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
