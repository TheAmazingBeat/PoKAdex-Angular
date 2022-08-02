import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonTypeChartComponent } from './pokemon-type-chart.component';

describe('PokemonTypeChartComponent', () => {
  let component: PokemonTypeChartComponent;
  let fixture: ComponentFixture<PokemonTypeChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonTypeChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonTypeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
