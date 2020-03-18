import { TestBed } from '@angular/core/testing';

import { MarcaService } from './marca.service';

describe('MarcaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MarcaService = TestBed.get(MarcaService);
    expect(service).toBeTruthy();
  });
});
