import { PessoaServiceEnum } from "../Enums/PessoaServiceEnum";

export interface IContato {
    Id: bigint;
    TipoContato: PessoaServiceEnum,
    Numero: number
}