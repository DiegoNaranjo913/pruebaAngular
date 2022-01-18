import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  url: string = 'https://reqres.in/api/users';
  url2: string = 'http://localhost:3000/users';
  constructor(private http: HttpClient) { }

  createUser(user: any) {
    return this.http.post(this.url2, { ...user });
  }

  getUsersServer(page: number, per_page: number) {
    const params = new HttpParams()
      .set('_page', page)
      .set('_limit', per_page)

    return this.http.get(this.url2, { params, observe: 'response' });
  }

  updateUser(user: any) {
    return this.http.put(`${this.url2}/${user.id}`, { ...user });
  }


  deleteUser(id: number) {
    return this.http.delete(`${this.url2}/${id}`);
  }
}
