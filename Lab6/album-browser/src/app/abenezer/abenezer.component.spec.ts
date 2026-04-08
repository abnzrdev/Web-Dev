import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbenezerComponent } from './abenezer.component';

describe('AbenezerComponent', () => {
  let component: AbenezerComponent;
  let fixture: ComponentFixture<AbenezerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbenezerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AbenezerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
