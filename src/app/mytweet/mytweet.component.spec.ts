import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MytweetComponent } from './mytweet.component';

describe('MytweetComponent', () => {
  let component: MytweetComponent;
  let fixture: ComponentFixture<MytweetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MytweetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MytweetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
