import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementParkirComponent } from './management-parkir.component';

describe('ManagementParkirComponent', () => {
  let component: ManagementParkirComponent;
  let fixture: ComponentFixture<ManagementParkirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagementParkirComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementParkirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
