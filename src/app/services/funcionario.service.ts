import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FuncionarioService {
  private apiUrl =
    'https://bu.furb.br/mcardoso/progWeb/apiRestAval.php/cadastro';

  constructor(private http: HttpClient) {}

  getFuncionarios(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  editarFuncionario(id: number, funcionarioData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, funcionarioData);
  }

  deletarFuncionario(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
