import { TestBed } from '@angular/core/testing';

import { MarcamodeloService } from './marcamodelo.service';

describe('MarcamodeloService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MarcamodeloService = TestBed.get(MarcamodeloService);
    expect(service).toBeTruthy();
  });
});
