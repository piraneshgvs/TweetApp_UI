import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlltweetComponent } from './alltweet.component';

describe('AlltweetComponent', () => {
  let component: AlltweetComponent;
  let fixture: ComponentFixture<AlltweetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlltweetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlltweetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
