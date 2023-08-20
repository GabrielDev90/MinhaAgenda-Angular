import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { IPessoa } from 'src/app/shared/Interface/IPessoa';
import { PessoaServiceService } from 'src/app/shared/services/pessoa-service.service';

@Component({
  selector: 'app-cadastro-dialog',
  templateUrl: './cadastro-dialog.component.html',
  styleUrls: ['./cadastro-dialog.component.css']
})
export class CadastroDialogComponent implements OnInit {
  formGroup: FormGroup
  tipoContato: string[] = ["Telefone", "Wpp", "Email"];
  id: number
  nomeContato: string;
  totalCamposContato: number

  constructor(private pessoaServiceService: PessoaServiceService,
    private dialogRef: MatDialogRef<CadastroDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.criaAgendaForm();
    if (this.data.pessoa !== undefined) {
      this.nomeContato = this.data.pessoa.nome;

      var total = this.data.pessoa.totalContatos - 1;

      for (let index = 0; index < total; index++) {
        this.AdicionaContatoCampo();
      }

      this.formGroup.patchValue({
        "nome": this.data.pessoa.nome,
        "contatos": this.data.pessoa.contatos
      });
    }
  }

  AdicionaContatoCampo(): void {
    const control = <FormArray>this.formGroup.controls['contatos'];
    control.push(new FormGroup({
      tipoContato: new FormControl(null, Validators.required),
      numero: new FormControl(null, Validators.required)
    }));
    this.settTotalCamposContato(control.length);
  }

  RemoveContatoCampo(index) {
    const control = <FormArray>this.formGroup.controls['contatos'];
    this.settTotalCamposContato(control.length);
    if (this.totalCamposContato > 1) {
      control.removeAt(index);
    }
  }

  async onSubmit(formData: IPessoa) {
    var $retornaPessoa = this.pessoaServiceService.RetornaPessoaPorNome(formData.nome);

    var existePessoa = await firstValueFrom($retornaPessoa).catch(error => {
      console.log("Contato não foi encontrado");
    });

    if (!this.nomeContato && !existePessoa) {
      this.pessoaServiceService.InserirPessoa(formData).subscribe((pessoa: IPessoa) => {
        this.dialogRef.close();
      });
    } else {
      if (confirm("Contato " + existePessoa.nome + " já existe na agenda, deseja sobrescrever todas as informações do contato?")) {
        this.nomeContato = existePessoa.nome;
        this.pessoaServiceService.AtualizarPessoa(this.nomeContato, formData).subscribe((pessoa: IPessoa) => {
          this.dialogRef.close();
        });
      }
    }
  }

  public criaAgendaForm() {
    this.formGroup = new FormGroup({
      nome: new FormControl(null, Validators.required),
      contatos: new FormArray([
        new FormGroup({
          tipoContato: new FormControl(null, Validators.required),
          numero: new FormControl(null, Validators.required)
        }),
      ])
    });
  }

  settTotalCamposContato(number: number) {
    this.totalCamposContato = number;
  }
}
