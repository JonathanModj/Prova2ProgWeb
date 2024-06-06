import { Component, OnInit } from '@angular/core';
import { FuncionarioService } from '../services/funcionario.service';
import { Funcionario } from '../model/funcionario';

@Component({
  selector: 'app-funcionario-list',
  templateUrl: './funcionario-list.component.html',
  styleUrl: './funcionario-list.component.scss',
})
export class FuncionarioListComponent implements OnInit {
  funcionarios: Funcionario[] = [];
  funcionarioSelecionado: Funcionario | null = null;
  sucesso: boolean = false;
  mensagem: string = '';

  constructor(private funcionarioService: FuncionarioService) {}

  ngOnInit(): void {
    this.getFuncionarios();
  }

  getFuncionarios(): void {
    this.funcionarioService.getFuncionarios().subscribe((funcionarios) => {
      this.funcionarios = funcionarios;
    });
  }

  editarFuncionario(funcionario: Funcionario): void {
    if (
      this.funcionarioSelecionado &&
      this.funcionarioSelecionado.id === funcionario.id
    ) {
      this.submeterEdicao();
    } else {
      this.funcionarioSelecionado = funcionario;
    }
  }

  submeterEdicao(): void {
    if (this.funcionarioSelecionado) {
      this.funcionarioService
        .editarFuncionario(
          this.funcionarioSelecionado.id,
          this.funcionarioSelecionado
        )
        .subscribe(
          (response) => {
            this.mensagem = response.mensagem;
            this.sucesso = response.status === 'Ok';
            if (this.sucesso) {
              this.getFuncionarios();
            }
          },
          (error) => {
            this.mensagem = 'Erro ao editar funcionário.';
            this.sucesso = false;
          }
        );
    }
  }

  deletarFuncionario(id: number): void {
    this.funcionarioService.deletarFuncionario(id).subscribe(
      (response) => {
        this.mensagem = response.mensagem;
        this.sucesso = response.status === 'Ok';
        if (this.sucesso) {
          this.getFuncionarios();
        }
      },
      (error) => {
        this.mensagem = 'Erro ao excluir funcionário.';
        this.sucesso = false;
      }
    );
  }
}
