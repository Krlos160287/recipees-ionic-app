import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UsersModel } from "src/app/models/users.model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root',
  })
  export class UsersService {

    endpoint = environment.api.url;

    constructor(
        private readonly http: HttpClient,
      ) {}

    public saveUser(user: UsersModel): Observable<UsersModel> {
      const httpOptions = {
        headers: {
          'Content-Type': 'application/json',
          // Authorization: token !== null ? 'Bearer ' + token : '',
          },
        }
      return this.http.post<UsersModel>(`${this.endpoint}`+ "/users", user, { headers: httpOptions.headers });
    }

    public getUser(user: UsersModel): Observable<UsersModel> {
      const httpOptions = {
        headers: {
          'Content-Type': 'application/json',
          // Authorization: token !== null ? 'Bearer ' + token : '',
          'x-access-token': '',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'GET',
          'Access-Control-Allow-Origin': '*',
          },
        }
      return this.http.get<UsersModel>(`${this.endpoint}`+ "/users/"+`${user.email}`, { headers: httpOptions.headers });
    }
  }