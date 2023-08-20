import { TestBed } from '@angular/core/testing';

import { PessoaCadastroService } from './shared/services/pessoa-cadastro.service';

describe('PessoaServiceService', () => {
  let service: PessoaCadastroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PessoaCadastroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
