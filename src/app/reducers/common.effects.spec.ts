import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { CommonEffects } from './common.effects';

describe('CommonEffects', () => {
  let actions$: Observable<any>;
  let effects: CommonEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CommonEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(CommonEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
