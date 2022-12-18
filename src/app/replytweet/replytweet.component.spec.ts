import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplytweetComponent } from './replytweet.component';

describe('ReplytweetComponent', () => {
  let component: ReplytweetComponent;
  let fixture: ComponentFixture<ReplytweetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReplytweetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReplytweetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
