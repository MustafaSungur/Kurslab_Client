import { Injectable } from '@angular/core';
import { HttpClientService } from '../httpclient.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClientService) {}

  createUser(user: FormData) {
    user.forEach((value, key) => {
      console.log(key + ' ' + value);
    });
    return this.httpClient.post<any>('/ApplicationUser/Create', user, true);
  }

  updateUser(id: string, user: FormData) {
    user.forEach((value, key) => {
      console.log(key + ' ' + value);
    });
    console.log(user.get('FirstName'));
    console.log(user.get('LirstName'));
    console.log(user.get('Image'));
    return this.httpClient.put<any>(
      `/ApplicationUser/Update/${id}`,
      user,
      true
    );
  }

  deleteUser(id: string) {
    return this.httpClient.delete<any>(`/ApplicationUser/Delete/${id}`);
  }

  filterUsers(filter: any) {
    return this.httpClient.post<any>('/ApplicationUser/Filter', filter);
  }

  getAllUsersAnalysis() {
    return this.httpClient.get<any | string>(`/ApplicationUser/Analysis`);
  }
}
