import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfinityScrollingThumbnailsComponent } from './infinity-scrolling-thumbnails.component';

describe('InfinityScrollingThumbnailsComponent', () => {
  let component: InfinityScrollingThumbnailsComponent;
  let fixture: ComponentFixture<InfinityScrollingThumbnailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfinityScrollingThumbnailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfinityScrollingThumbnailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
