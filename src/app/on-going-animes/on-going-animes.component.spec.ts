import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnGoingAnimesComponent } from './on-going-animes.component';

describe('OnGoingAnimesComponent', () => {
  let component: OnGoingAnimesComponent;
  let fixture: ComponentFixture<OnGoingAnimesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnGoingAnimesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnGoingAnimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
