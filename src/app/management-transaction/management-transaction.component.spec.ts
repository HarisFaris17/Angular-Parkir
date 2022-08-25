import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementTransactionComponent } from './management-transaction.component';

describe('ManagementTransactionComponent', () => {
  let component: ManagementTransactionComponent;
  let fixture: ComponentFixture<ManagementTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagementTransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
