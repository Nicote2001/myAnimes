import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularAnimesComponent } from './popular-animes.component';

describe('PopularAnimesComponent', () => {
  let component: PopularAnimesComponent;
  let fixture: ComponentFixture<PopularAnimesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopularAnimesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularAnimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
