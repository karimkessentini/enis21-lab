import { Component, OnInit } from '@angular/core';
import { Member } from 'src/models/memeber.model';
import { AuthentificationService } from 'src/services/authentification.service';
import {MemberService} from "src/services/member.service";

@Component({
  selector: 'app-member-profile',
  templateUrl: './member-profile.component.html',
  styleUrls: ['./member-profile.component.scss']
})
export class MemberProfileComponent implements OnInit {
  public connectedUser: Member = null;

  displayedColumns: string[] = ['id', 'cin', 'name', 'type', 'email', 'password'];
  dataSource: Member[] = [];

  constructor(
    private memberService :MemberService,
    private authentificationService: AuthentificationService
    ) { }

  ngOnInit(): void {
    this.fetchDataSource();
    this.checkConnected();
  }

  private fetchDataSource(): void {
    //this.memberService.getAllMembers().then(data => this.dataSource = data);
    this.dataSource=[this.connectedUser];
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
