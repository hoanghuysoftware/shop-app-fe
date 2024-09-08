import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterDTO } from '../dtos/auth/register.dto';
import { LoginDTO } from '../dtos/auth/login.dto';
import { base } from '../utils/enviroment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrlRegister = `${base.basePath}/users/register`;
  private apiUrlLogin = `${base.basePath}/users/login`;
  private apiHeader = {
    headers: this.createHeader(),
  };

  constructor(private http: HttpClient) {}
  private createHeader(): HttpHeaders {
    return new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  register(registerDTO: RegisterDTO): Observable<any> {
    const headers = this.createHeader();
    return this.http.post(this.apiUrlRegister, registerDTO, this.apiHeader);
  }

  login(loginDTO: LoginDTO): Observable<any> {
    const headers = this.createHeader();
    return this.http.post(this.apiUrlLogin, loginDTO, this.apiHeader);
  }
}
