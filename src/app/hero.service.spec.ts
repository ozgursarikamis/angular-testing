import { HeroService } from './hero.service';
import { TestBed } from '@angular/core/testing';
import { MessageService } from './message.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('HeroService', () => {

  let mockMessageService: any;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    mockMessageService = jasmine.createSpyObj(['add']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroService, { provide: MessageService, useValue: mockMessageService }]
    });

    httpTestingController = TestBed.get(HttpTestingController);
  });
});
