import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SantiDiceComponent } from './santi-dice.component';

describe('SantiDiceComponent', () => {
  let component: SantiDiceComponent;
  let fixture: ComponentFixture<SantiDiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SantiDiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SantiDiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
