import { HeroService } from './hero.service';
import { TestBed } from '@angular/core/testing';
import { MessageService } from './message.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('HeroService', () => {

  let mockMessageService: any;
  let httpTestingController: HttpTestingController;
  let _service: HeroService;

  beforeEach(() => {
    mockMessageService = jasmine.createSpyObj(['add']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroService, { provide: MessageService, useValue: mockMessageService }]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    _service = TestBed.get(HeroService);
  });

  describe('getHero', () => {
    // it('should call get with the correct URL', () => {
      // _service.getHero(1); // or inject method can be used:
    // });
    it('should call get with the correct URL', () => {
      _service.getHero(4).subscribe();
      const request = httpTestingController.expectOne('/api/heroes/4');
      request.flush({ id: 4, name: 'SuperDude', strength: 100 });
      httpTestingController.verify();
    });
  });
});
