import { TestBed } from '@angular/core/testing';

import { TweetAppServiceService } from './tweet-app-service.service';

describe('TweetAppServiceService', () => {
  let service: TweetAppServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TweetAppServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
