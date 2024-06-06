export class Funcionario {
    nome: string;
    departamento: string;
    endereco: string;
    email: string;
    id: number;
  
    constructor(nome: string, departamento: string, endereco: string, email: string, id: number) {
      this.nome = nome;
      this.departamento = departamento;
      this.endereco = endereco;
      this.email = email;
      this.id = id;
    }
  }