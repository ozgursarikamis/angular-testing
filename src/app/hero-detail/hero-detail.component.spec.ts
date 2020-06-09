import { HeroDetailComponent } from './hero-detail.component';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../hero.service';
import { Location } from '@angular/common';
import { of } from 'rxjs/internal/observable/of';

describe('HeroDetailCompoent', () => {
  let fixture: ComponentFixture<HeroDetailComponent>;
  let mockActivatedRoute, mockHeroService, mockLocation;

  beforeEach(() => {
    mockActivatedRoute = {
      snapshot: {
        paramMap: { get: () => '3'}
      }
    };
    mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero']);
    mockLocation = jasmine.createSpyObj(['back']);

    TestBed.configureTestingModule({
      declarations: [HeroDetailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: HeroService, useValue: mockHeroService },
        { provide: Location, useValue: mockLocation },
      ]
    });

    fixture = TestBed.createComponent(HeroDetailComponent);
    mockHeroService.getHero.and.returnValue(of({ id: 3, name: 'SuperDude', strength: 100}));
  });

  it('should render the hero name in a h2 tag', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('h2').textContent).toContain('SuperDude'.toLocaleUpperCase());
  });
});