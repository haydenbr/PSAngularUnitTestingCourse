import { TestBed, ComponentFixture, fakeAsync, flush, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';
import { of } from 'rxjs';


const generateMockActivatedRoute = (output: string = '') => ({
  snapshot: { paramMap: { get: (params: string) => output } }
});

describe('HeroDetailComponent', () => {
  let mockActivatedRoute;
  let mockHeroService;
  let mockLocation;
  let fixture: ComponentFixture<HeroDetailComponent>;
  let mockHero: Hero = { id: 1, name: 'Dopinder', strength: 15 };

  beforeEach(() => {
    mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero']);
    mockLocation = jasmine.createSpyObj(['back']);
    mockActivatedRoute = generateMockActivatedRoute();

    mockHeroService.getHero.and.returnValue(of(mockHero));

    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [HeroDetailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: HeroService, useValue: mockHeroService },
        { provide: Location, useValue: mockLocation },
      ]
    });

    fixture = TestBed.createComponent(HeroDetailComponent);
    fixture.detectChanges();
  });

  it('should render hero name in an h2 tag', () => {
    expect(fixture.nativeElement.querySelector('h2').textContent).toContain(mockHero.name.toUpperCase());
  });

  it('should call update hero when save is called', fakeAsync(() => {
    mockHeroService.updateHero.and.returnValue(of({}));

    fixture.componentInstance.save();
    flush();

    expect(mockHeroService.updateHero).toHaveBeenCalled();
  }));
});
