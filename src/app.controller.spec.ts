import { Test, TestingModule } from '@nestjs/testing';

import * as createData from '../test/data/create.json';
import { AppController } from './app.controller';
import { Match } from './models/match';
import { Player } from './models/player';
import { MatchDto } from './tennis.dto';
import { TennisService } from './tennis.service';

describe('AppController', () => {
  let appController: AppController;
  let service: TennisService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [TennisService],
    }).compile();
    appController = app.get<AppController>(AppController);
    service = app.get<TennisService>(TennisService);
  });

  describe('root', () => {
    it('should create game', () => {
      const match = appController.createMatch(createData);
      expect(match).toBeInstanceOf(MatchDto);
    });
    it('should create game and retrieve', () => {
      const match = appController.createMatch(createData);
      expect(match).toBeInstanceOf(MatchDto);
      const result = appController.result(0);
      expect(result).toBeInstanceOf(MatchDto);
    });
    it('should create game and do not add p3 points to game win', () => {
      const match = appController.createMatch(createData);
      expect(match).toBeInstanceOf(MatchDto);
      try {
        appController.addPoint({
          gameId: 0,
          point: 'p3',
        });
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
      }
    });
    it('should create game and add p1 points to game win', () => {
      const match = appController.createMatch(createData);
      expect(match).toBeInstanceOf(MatchDto);
      const point1 = appController.addPoint({
        gameId: 0,
        point: 'p1',
      });
      expect(point1.currentGame['p1']).toEqual('15');
      const point2 = appController.addPoint({
        gameId: 0,
        point: 'p1',
      });
      expect(point2.currentGame['p1']).toEqual('30');
      const point3 = appController.addPoint({
        gameId: 0,
        point: 'p1',
      });
      expect(point3.games['p1']).toEqual(0);
      expect(point3.currentGame['p1']).toEqual('40');
      const point4 = appController.addPoint({
        gameId: 0,
        point: 'p1',
      });
      expect(point4.games['p1']).toEqual(0);
      expect(point4.currentGame['p1']).toEqual('game');
      const point5 = appController.addPoint({
        gameId: 0,
        point: 'p1',
      });
      expect(point5.games['p1']).toEqual(1);
      expect(point5.currentGame['p1']).toEqual('love');
    });

    it('should create game and add points to deuce', () => {
      const match = appController.createMatch(createData);
      expect(match).toBeInstanceOf(MatchDto);
      const point1 = appController.addPoint({
        gameId: 0,
        point: 'p1',
      });
      expect(point1.currentGame['p1']).toEqual('15');
      const point2 = appController.addPoint({
        gameId: 0,
        point: 'p1',
      });
      expect(point2.currentGame['p1']).toEqual('30');
      const point3 = appController.addPoint({
        gameId: 0,
        point: 'p1',
      });
      expect(point3.games['p1']).toEqual(0);
      expect(point3.currentGame['p1']).toEqual('40');
      expect(point3.currentGame['p2']).toEqual('love');
      const point4 = appController.addPoint({
        gameId: 0,
        point: 'p1',
      });
      expect(point4.currentGame['p1']).toEqual('game');
      expect(point4.currentGame['p2']).toEqual('love');
      const point5 = appController.addPoint({
        gameId: 0,
        point: 'p2',
      });
      expect(point5.games['p1']).toEqual(0);
      expect(point5.currentGame['p1']).toEqual('40');
      expect(point5.currentGame['p2']).toEqual('40');
      const point6 = appController.addPoint({
        gameId: 0,
        point: 'p2',
      });
      expect(point6.games['p1']).toEqual(0);
      expect(point6.games['p2']).toEqual(0);
      expect(point6.currentGame['p1']).toEqual('40');
      expect(point6.currentGame['p2']).toEqual('game');

      const point7 = appController.addPoint({
        gameId: 0,
        point: 'p2',
      });
      expect(point7.games['p1']).toEqual(0);
      expect(point7.games['p2']).toEqual(1);
    });
  });
  it('should win set', () => {
    jest.spyOn(service, 'retrieve').mockImplementation(() => {
      const match = new Match('Feder vs Nadal', [new Player('p1', 'Federer'), new Player('p2', 'Nadal')]);
      match.games = { p1: 5, p2: 0 };
      match.currentGame = { p1: 4, p2: 0 };
      return match;
    });
    const point1 = appController.addPoint({
      gameId: 0,
      point: 'p1',
    });
    expect(point1.sets).toHaveLength(1);
  });
  it('should start tie', () => {
    jest.spyOn(service, 'retrieve').mockImplementation(() => {
      const match = new Match('Feder vs Nadal', [new Player('p1', 'Federer'), new Player('p2', 'Nadal')]);
      match.games = { p1: 6, p2: 6 };
      match.currentGame = { p1: 4, p2: 0 };
      return match;
    });
    const point1 = appController.addPoint({
      gameId: 0,
      point: 'p1',
    });
    expect(point1.sets).toHaveLength(0);
  });
  it('should start win tie', () => {
    jest.spyOn(service, 'retrieve').mockImplementation(() => {
      const match = new Match('Feder vs Nadal', [new Player('p1', 'Federer'), new Player('p2', 'Nadal')]);
      match.games = { p1: 6, p2: 6 };
      match.currentGame = { p1: 4, p2: 0 };
      match.tieBreaker = { p1: 6, p2: 0 };
      return match;
    });
    const point1 = appController.addPoint({
      gameId: 0,
      point: 'p1',
    });
    expect(point1.sets).toHaveLength(1);
  });
  it('should not win tie', () => {
    jest.spyOn(service, 'retrieve').mockImplementation(() => {
      const match = new Match('Feder vs Nadal', [new Player('p1', 'Federer'), new Player('p2', 'Nadal')]);
      match.games = { p1: 6, p2: 6 };
      match.currentGame = { p1: 4, p2: 0 };
      match.tieBreaker = { p1: 6, p2: 6 };
      return match;
    });
    const point1 = appController.addPoint({
      gameId: 0,
      point: 'p1',
    });
    expect(point1.sets).toHaveLength(0);
  });
  it('should win tie', () => {
    jest.spyOn(service, 'retrieve').mockImplementation(() => {
      const match = new Match('Feder vs Nadal', [new Player('p1', 'Federer'), new Player('p2', 'Nadal')]);
      match.games = { p1: 6, p2: 6 };
      match.currentGame = { p1: 4, p2: 0 };
      match.tieBreaker = { p1: 7, p2: 6 };
      return match;
    });
    const point1 = appController.addPoint({
      gameId: 0,
      point: 'p1',
    });
    expect(point1.sets).toHaveLength(1);
  });
});
