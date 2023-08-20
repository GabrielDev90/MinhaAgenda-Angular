import { IContato } from "./IContato";

export interface IPessoa {
    id: number;
    nome: string;
    contatos: Array<IContato>;
    totalContatos: number;
}