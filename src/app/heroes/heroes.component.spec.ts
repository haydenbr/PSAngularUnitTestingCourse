import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { HeroComponent } from '../hero/hero.component';

import { HeroesComponent } from './heroes.component';
import { By } from '@angular/platform-browser';


describe('HeroesComponent', () => {
  let heroes: Hero[] = [
    { id: 1, name: 'Dopinder', strength: 7 },
    { id: 2, name: 'Dead Pool', strength: 75 },
    { id: 3, name: 'Cable', strength: 80 }
  ];
  let mockHeroService;

  beforeEach(() => {
    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
  });

  describe('delete', () => {
    let component: HeroesComponent;

    beforeEach(() => {
      component = new HeroesComponent(mockHeroService);

      mockHeroService.deleteHero.and.returnValue(of());
      component.heroes = heroes;
    });

    it('should remove the indicated hero from the heroes list', () => {
      component.delete(heroes[0]);

      expect(component.heroes.length).toBe(2);
    });

    it('should call HeroService.deleteHero()', () => {
      component.delete(heroes[0]);

      expect(mockHeroService.deleteHero).toHaveBeenCalledWith(heroes[0]);
    });
  });

  describe('template', () => {
    let fixture: ComponentFixture<HeroesComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [HeroesComponent],
        providers: [{ provide: HeroService, useValue: mockHeroService }],
        schemas: [NO_ERRORS_SCHEMA]
      });

      fixture = TestBed.createComponent(HeroesComponent);
      mockHeroService.getHeroes.and.returnValue(of(heroes));
      fixture.detectChanges();
    });

    it('should set heroes from service', () => {
      expect(fixture.componentInstance.heroes.length).toBe(heroes.length);
    });

    it('should render a list of heroes', () => {
      expect(fixture.nativeElement.querySelectorAll('li').length).toBe(heroes.length);
    });
  });

  describe('with child components', () => {
    let fixture: ComponentFixture<HeroesComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [HeroesComponent, HeroComponent],
        providers: [{ provide: HeroService, useValue: mockHeroService }],
        schemas: [NO_ERRORS_SCHEMA]
      });

      fixture = TestBed.createComponent(HeroesComponent);
      mockHeroService.getHeroes.and.returnValue(of(heroes));
      fixture.detectChanges();
    });

    it('should render each hero as a hero component', () => {
      let heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
      expect(heroComponents.length).toBe(heroes.length);

      heroComponents.forEach((hc, i) => expect(hc.componentInstance.hero).toEqual(heroes[i]));
    });

    it('should call heroService.deleteHero when hero component delete button is clicked', () => {
      spyOn(fixture.componentInstance, 'delete');
      let heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));

      heroComponents[0].triggerEventHandler('delete', {});

      expect(fixture.componentInstance.delete).toHaveBeenCalledWith(heroes[0]);
    });

    it('should add hero to list of heroes when clicking add button', () => {
      let newHero = { id: 1000, name: 'Domino', strength: 15 };
      mockHeroService.addHero.and.returnValue(of(newHero));
      let inputElement = fixture.nativeElement.querySelector('input');
      let button = fixture.debugElement.query(By.css('#add-hero'));

      inputElement.value = newHero.name;
      button.triggerEventHandler('click', {});
      fixture.detectChanges();

      let listContent = fixture.nativeElement.querySelector('ul').textContent;
      expect(listContent).toContain(newHero.name);
    });
  });
});
