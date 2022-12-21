import { TestBed } from '@angular/core/testing';

import { PortafolioHomeService } from './portafolio-home.service';

describe('PortafolioHomeService', () => {
  let service: PortafolioHomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PortafolioHomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
