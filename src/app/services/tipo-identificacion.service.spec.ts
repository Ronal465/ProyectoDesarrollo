import { TestBed } from '@angular/core/testing';

import { TipoIdentificacionService } from './tipo-identificacion.service';

describe('TipoIdentificacionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TipoIdentificacionService = TestBed.get(TipoIdentificacionService);
    expect(service).toBeTruthy();
  });
});
