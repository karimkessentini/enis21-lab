import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GLOBAL} from "../app/app-config";
import {Utils} from "../utils/utils";
import {Member} from "../models/memeber.model";

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  public placeholderMembers: Member[] = [];

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  getAllMembers(): Promise<Member[]> {
    // return this.httpClient.get<Member[]>('linkToRestApi').toPromise();
    return new Promise(resolve => resolve([...this.placeholderMembers, ...GLOBAL._DB.members]));
  }


  getMemberById(id: string): Promise<Member> {
    // return this.httpClient.get<Member>('linkToRestApi').toPromise();
    return new Promise(resolve => resolve(
      [...this.placeholderMembers, ...GLOBAL._DB.members].filter(item => item.id === id)[0] ?? null
    ));
  }


  saveMember(member: any): Promise<Member> {
    // return this.httpClient.post<Member>('linkToRestApi', member).toPromise();
    return new Promise(resolve => {
      const newMember = {
        id: member.id ?? Utils.fakeNumber(),
        createdDate: member.createdDate ?? new Date().toISOString(), ...member
      };
      this.placeholderMembers = [newMember, ...this.placeholderMembers];
      resolve(newMember);
    });

  }

}
