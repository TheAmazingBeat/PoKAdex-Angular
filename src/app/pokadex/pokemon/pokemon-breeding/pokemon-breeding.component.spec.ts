import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonBreedingComponent } from './pokemon-breeding.component';

describe('PokemonBreedingComponent', () => {
  let component: PokemonBreedingComponent;
  let fixture: ComponentFixture<PokemonBreedingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonBreedingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonBreedingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
