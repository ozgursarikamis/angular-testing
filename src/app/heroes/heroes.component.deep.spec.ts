import { HeroesComponent } from './heroes.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, Directive, Input } from '@angular/core';
import { HeroService } from '../hero.service';
import { of } from 'rxjs/internal/observable/of';
import { Hero } from '../hero';
import { By } from '@angular/platform-browser';
import { HeroComponent } from '../hero/hero.component';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[routerLink]',
  // tslint:disable-next-line: use-host-property-decorator
  host: { '(click)': 'onClick()'}
})
// tslint:disable-next-line: directive-class-suffix
export class RouterLinkDirectiveStub {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;
  onClick() {
    this.navigatedTo = this.linkParams;
  }
}

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
      declarations: [HeroesComponent, HeroComponent, RouterLinkDirectiveStub],
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
    // (<HeroComponent>heroComponents[1].componentInstance).delete.emit();
    heroComponents[1].triggerEventHandler('delete', null);
    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(heroes[1]);
  });

  it('should add a new hero to the list when the add button is clicked', () => {
    mockHeroService.getHeroes.and.returnValue(of(heroes));
    // run ngOnInit:
    fixture.detectChanges();

    const name = 'Mr. Ice';
    mockHeroService.addHero.and.returnValue(of({ id: 5, name: name, strength: 4 }));

    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    const addButton = fixture.debugElement.queryAll(By.css('button'))[0];

    inputElement.value = name;
    addButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;
    expect(heroText).toContain(name);
  });

  it('should have the correct route for the first hero', () => {
    mockHeroService.getHeroes.and.returnValue(of(heroes));
    // run ngOnInit:
    fixture.detectChanges();
    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
    const routerLink = heroComponents[0]
                    .query(By.directive(RouterLinkDirectiveStub))
                    .injector.get(RouterLinkDirectiveStub);

    heroComponents[0].query(By.css('a')).triggerEventHandler('click', null);
    expect(routerLink.navigatedTo).toBe('/detail/1');
  });
});
