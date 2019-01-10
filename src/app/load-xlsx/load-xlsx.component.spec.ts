import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadXLSXComponent } from './load-xlsx.component';

describe('LoadXLSXComponent', () => {
  let component: LoadXLSXComponent;
  let fixture: ComponentFixture<LoadXLSXComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadXLSXComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadXLSXComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
