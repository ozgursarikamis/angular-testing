import { HeroesComponent } from './heroes.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HeroService } from '../hero.service';
import { of } from 'rxjs/internal/observable/of';
import { Hero } from '../hero';
import { By } from '@angular/platform-browser';
import { HeroComponent } from '../hero/hero.component';

describe('HeroesComponent (deep tests)', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService: any;
  let heroes: Hero[];

  beforeEach(() => {
    heroes = [
      { id: 1, name: 'SpiderDude', strength: 8 },
      { id: 2, name: 'Wonderful Woman', strength: 24 },
      { id: 3, name: 'SuperDude', strength: 55 }
    ];
    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

    TestBed.configureTestingModule({
      declarations: [HeroesComponent, HeroComponent],
      providers: [
        { provide: HeroService, useValue: mockHeroService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    mockHeroService.getHeroes.and.returnValue(of(heroes));
    fixture = TestBed.createComponent(HeroesComponent);
    fixture.detectChanges();
  });

  it('should render each hero as a HeroComponent', () => {
    mockHeroService.getHeroes.and.returnValue(of(heroes));
    fixture.detectChanges(); // trigger ngOnInit

    // see if the child component HeroeComponent included:
    const heroComponentsDebugElements = fixture.debugElement.queryAll(By.directive(HeroComponent));
    // expect(heroComponentsDebugElements.length).toEqual(heroes.length);
    // expect(heroComponentsDebugElements[0].componentInstance.hero.name).toBe('SpiderDude');
    // expect(heroComponentsDebugElements[1].componentInstance.hero.name).toBe('Wonderful Woman');
    // expect(heroComponentsDebugElements[2].componentInstance.hero.name).toBe('SuperDude');

    // or:
    for (let i = 0; i < heroes.length; i++) {
      expect(heroComponentsDebugElements[i].componentInstance.hero.name).toBe(heroes[i].name);
    }
  });

  it(`should call heroservice.deleteHero when the Hero Component's delete button is clicked`, () => {
    spyOn(fixture.componentInstance, 'delete');
    mockHeroService.getHeroes.and.returnValue(of(heroes));

    // run ngOnInit:
    fixture.detectChanges();

    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
    (<HeroComponent>heroComponents[1].componentInstance).delete.emit();
    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(heroes[1]);
  });
});
