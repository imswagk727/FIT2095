import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelBillComponent } from './del-bill.component';

describe('DelBillComponent', () => {
  let component: DelBillComponent;
  let fixture: ComponentFixture<DelBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelBillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DelBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
