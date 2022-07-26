import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokadexComponent } from './pokadex.component';

describe('PokadexComponent', () => {
  let component: PokadexComponent;
  let fixture: ComponentFixture<PokadexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokadexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokadexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
