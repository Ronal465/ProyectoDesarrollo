import { TestBed } from '@angular/core/testing';

import { EstadoEmpleadoService } from './estado-empleado.service';

describe('EstadoEmpleadoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EstadoEmpleadoService = TestBed.get(EstadoEmpleadoService);
    expect(service).toBeTruthy();
  });
});
