import { TestBed, inject } from '@angular/core/testing';

import { InfinityScrollingThumbnailsService } from './infinity-scrolling-thumbnails.service';

describe('InfinityScrollingThumbnailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InfinityScrollingThumbnailsService]
    });
  });

  it('should be created', inject([InfinityScrollingThumbnailsService], (service: InfinityScrollingThumbnailsService) => {
    expect(service).toBeTruthy();
  }));
});
