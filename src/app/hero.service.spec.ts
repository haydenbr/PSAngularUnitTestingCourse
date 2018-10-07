import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { MessageService } from './message.service';

import { HeroService } from './hero.service';

describe('HeroService', () => {
  let mockMessageService;
  let httpController: HttpTestingController;
  let heroService: HeroService;

  beforeEach(() => {
    mockMessageService = jasmine.createSpyObj(['add']);

    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ HeroService, { provide: MessageService, useValue: mockMessageService } ]
    });

    httpController = TestBed.get(HttpTestingController);
    heroService = TestBed.get(HeroService);
  });

  describe('getHero', () => {
    it('should call get with the correct URL', () => {
      let heroId = 1;
      heroService.getHero(heroId).subscribe();

      let req = httpController.expectOne(`api/heroes/${heroId}`);
      req.flush({ id: heroId, name: 'Dupinder', strength: 10 });
      httpController.verify();
    });
  });
});
