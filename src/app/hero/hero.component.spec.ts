import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';

import { HeroComponent } from './hero.component';

describe('HeroComponent', () => {
  let fixture: ComponentFixture<HeroComponent>;
  let hero = { id: 1, name: 'Dupinder', strength: 8 };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroComponent],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(HeroComponent);

    fixture.componentInstance.hero = hero;
    fixture.detectChanges();
  });

  it('should have the correct hero', () => {
    expect(fixture.componentInstance.hero.name).toBe(hero.name);
  });

  it('should render the hero name in an anchor tag', () => {
    expect(fixture.nativeElement.querySelector('a').textContent).toContain(hero.name);
  });
});
