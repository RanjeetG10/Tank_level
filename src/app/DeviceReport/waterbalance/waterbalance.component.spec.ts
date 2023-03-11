import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterbalanceComponent } from './waterbalance.component';

describe('WaterbalanceComponent', () => {
  let component: WaterbalanceComponent;
  let fixture: ComponentFixture<WaterbalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaterbalanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaterbalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
