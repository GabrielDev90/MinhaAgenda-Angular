import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CadastroDialogComponent } from './cadastro-dialog/cadastro-dialog.component';
import { PessoaCadastroService } from '../shared/services/pessoa-cadastro.service';
import { IPessoa } from '../shared/Interface/IPessoa';

@Component({
  selector: 'app-lista-contatos',
  templateUrl: './lista-contatos.component.html',
  styleUrls: ['./lista-contatos.component.css']
})
export class ListaContatosComponent implements OnInit {
  formGroup: FormGroup
  dataSource = null;
  tipoContato: string[] = ["Telefone", "Wpp", "Email"];
  displayedColumns: string[] = ['Id', 'Nome', 'Total Contatos', 'Editar', 'Deletar'];
  dialogTeight = "600px";
  dialogWidth = "700px";

  constructor(private pessoaCadastroService: PessoaCadastroService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.retornaPessoas();
  }

  public retornaPessoas() {
    this.pessoaCadastroService
      .RetornaPessoas()
      .subscribe((response: IPessoa) => {
        this.dataSource = response;
      });
  }

  public openDialog(): void {
    var dialogRef = this.openModal();
    this.afterClosed(dialogRef);
  }

  public EditarContato(pessoa: IPessoa) {
    var dialogRef = this.openModal(pessoa);
    this.afterClosed(dialogRef);
  }

  public DeletarContato(pessoa: IPessoa) {
    this.pessoaCadastroService.DeletarPessoa(pessoa.id).subscribe((x) => {
      this.retornaPessoas();
    });
  }

  public afterClosed(dialogRef: MatDialogRef<CadastroDialogComponent, any>) {
    dialogRef.afterClosed().subscribe(result => {
      this.retornaPessoas();
    });
  }

  openModal(pessoa?: IPessoa): MatDialogRef<CadastroDialogComponent, any> {
    console.log(pessoa);
    return this.dialog.open(CadastroDialogComponent, {
      height: this.dialogTeight,
      width: this.dialogWidth,
      data: { pessoa }
    });
  }
}
