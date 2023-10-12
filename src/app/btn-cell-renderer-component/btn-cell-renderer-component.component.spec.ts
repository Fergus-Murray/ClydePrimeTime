import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnCellRendererComponentComponent } from './btn-cell-renderer-component.component';

describe('BtnCellRendererComponentComponent', () => {
  let component: BtnCellRendererComponentComponent;
  let fixture: ComponentFixture<BtnCellRendererComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BtnCellRendererComponentComponent]
    });
    fixture = TestBed.createComponent(BtnCellRendererComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
