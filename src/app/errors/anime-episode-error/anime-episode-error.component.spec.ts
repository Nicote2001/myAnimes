import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimeEpisodeErrorComponent } from './anime-episode-error.component';

describe('AnimeEpisodeErrorComponent', () => {
  let component: AnimeEpisodeErrorComponent;
  let fixture: ComponentFixture<AnimeEpisodeErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimeEpisodeErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimeEpisodeErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
