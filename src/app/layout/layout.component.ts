import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Member } from 'src/models/memeber.model';
import { AuthentificationService } from 'src/services/authentification.service';

@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, AfterViewInit {
  public connectedUser: Member = null;
  constructor(private authentificationService: AuthentificationService) { }

  ngOnInit(): void {
    this.checkConnected();
  }

  ngAfterViewInit(): void {
    // this.checkConnected();
  }

  logout(): void {
    this.authentificationService.logout();
    this.checkConnected();
  }

  checkConnected(): void {
    const user: Member = JSON.parse(localStorage.getItem('connectedUser'));
    if (user) {
      this.connectedUser = user;
    } else {
      this.connectedUser = null;
    }
  }

}
