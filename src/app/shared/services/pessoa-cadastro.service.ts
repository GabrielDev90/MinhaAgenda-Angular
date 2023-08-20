import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PessoaServiceEnum } from 'src/app/shared/Enums/PessoaServiceEnum';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PessoaCadastroService {

  private readonly url: string;

  constructor(private httpClient: HttpClient) {
    this.url = environment.backendUrlApi
  }

  public InserirPessoa(pessoa: any): Observable<any> {
    return this.httpClient.post(this.url + PessoaServiceEnum.InserirPessoa, pessoa);
  }

  public AtualizarPessoa(nomeContato: string, pessoa: any): Observable<any> {
    console.log(this.url + PessoaServiceEnum.AtualizarPessoa + "/" + nomeContato, pessoa);
    return this.httpClient.put(this.url + PessoaServiceEnum.AtualizarPessoa + "/" + nomeContato, pessoa);
  }

  public RetornaPessoas(): Observable<any> {
    return this.httpClient.get(this.url + PessoaServiceEnum.RetornaPessoas);
  }

  public RetornaPessoaPorNome(nomeContato: string): Observable<any> {
    console.log(this.url + PessoaServiceEnum.RetornaPessoaPorNome + "/" + nomeContato);
    return this.httpClient.get(this.url + PessoaServiceEnum.RetornaPessoaPorNome + "/" + nomeContato);
  }

  public DeletarPessoa(Id: number): Observable<any> {
    console.log(this.url + PessoaServiceEnum.DeletarPessoa + "/" + Id);
    return this.httpClient.delete(this.url + PessoaServiceEnum.DeletarPessoa + "/" + Id);
  }
}
