import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonBasicDataComponent } from './pokemon-basic-data.component';

describe('PokemonBasicDataComponent', () => {
  let component: PokemonBasicDataComponent;
  let fixture: ComponentFixture<PokemonBasicDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonBasicDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonBasicDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
