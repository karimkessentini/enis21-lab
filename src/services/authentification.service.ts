import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { GLOBAL } from 'src/app/app-config';
import { Member, Role } from 'src/models/memeber.model';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  public listUsers: Member[] = GLOBAL._DB.members;

  constructor() { }

  login(email: string, password: string): Promise<Member> {
    return new Promise((resolve, reject) => {
      const user = this.listUsers.find(user => user.email === email && user.password === password);
      if (user) {
        localStorage.setItem('connectedUser', JSON.stringify(user));
        resolve(user);
      } else {
        localStorage.removeItem('connectedUser');
        reject('User not found');
      }
    })
  }

  logout() {
    localStorage.removeItem('connectedUser');
  }

  get getRole(): string {
    const user: Member = JSON.parse(localStorage.getItem('connectedUser'));
    if (user) {
      return user.role;
    }
    return null;
  }

  isAdmin() {
    return this.getRole === Role.ADMIN ? true : false;
  }
  isMember() {
    return this.getRole === Role.MEMBER ? true : false;
  }
}
