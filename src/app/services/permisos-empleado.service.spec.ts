import { TestBed } from '@angular/core/testing';

import { PermisosEmpleadoService } from './permisos-empleado.service';

describe('PermisosEmpleadoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PermisosEmpleadoService = TestBed.get(PermisosEmpleadoService);
    expect(service).toBeTruthy();
  });
});
