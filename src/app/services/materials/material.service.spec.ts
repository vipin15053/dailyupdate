/**
 * Created By : Vipin Yadav 
 */

import { TestBed, inject } from '@angular/core/testing';

import { MaterialService } from './material.service';

describe('MaterialService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MaterialService]
    });
  });

  it('should be created', inject([MaterialService], (service: MaterialService) => {
    expect(service).toBeTruthy();
  }));
});

/**
 * Created By : Vipin Yadav 
 */
