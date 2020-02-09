import { TestBed } from '@angular/core/testing';

import { CorreoService } from './correo.service';

describe('CorreoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CorreoService = TestBed.get(CorreoService);
    expect(service).toBeTruthy();
  });
});
