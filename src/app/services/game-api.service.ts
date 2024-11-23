import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { lastValueFrom } from 'rxjs';

const _BASE_URL = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class GameApiService {
  constructor(private http: HttpClient) {}

  async login(usuario: string, password: string): Promise<any> {
    const response = await lastValueFrom(
      this.http.post<{ message: string; token: string }>(`${_BASE_URL}/login`, { usuario, password })
    );

    localStorage.setItem('token', response.token);
    return response;
  }

  async register(correo: string, usuario: string, password: string): Promise<any> {
    return await lastValueFrom(
      this.http.post(`${_BASE_URL}/register`, { correo, usuario, password })
    );
  }

  async start(): Promise<any> {
    return await lastValueFrom(
      this.http.post(`${_BASE_URL}/start`, {})
    );
  }

  async guess(numero: number): Promise<any> {
    return await lastValueFrom(
      this.http.post<{ message: string }>(`${_BASE_URL}/guess`, { numero })
    );
  }

  async restart(): Promise<any> {
    return await lastValueFrom(
      this.http.post<{ message: string }>(`${_BASE_URL}/restart`, {})
    );
  }

  async leaderboard(): Promise<any> {
    return await lastValueFrom(
      this.http.get<{ players: any[] }>(`${_BASE_URL}/leaderboard`)
    );
  }
}

