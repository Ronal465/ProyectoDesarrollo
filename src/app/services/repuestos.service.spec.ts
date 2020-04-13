import { TestBed } from '@angular/core/testing';

import { RepuestosService } from './repuestos.service';

describe('RepuestosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RepuestosService = TestBed.get(RepuestosService);
    expect(service).toBeTruthy();
  });
});
