import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GLOBAL} from "../app/app-config";
import {Utils} from "../utils/utils";
import {Tool} from "../models/tool.model";
import { Article } from 'src/models/article.model';
import { Event } from 'src/models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  public placeholderEvents: Event[] = GLOBAL._DB.events;

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  getAllEvents(): Promise<Event[]> {
    // return this.httpClient.get<Event[]>('linkToRestApi').toPromise();
    return new Promise(resolve => resolve(this.placeholderEvents));
  }

  getEventById(id: string): Promise<Event> {
    // return this.httpClient.get<Event>('linkToRestApi').toPromise();
    return new Promise(resolve => resolve(
      this.placeholderEvents.filter(item => item.id === id)[0] ?? null
    ));
  }

  /**
   * create a new Event or update an old Event.
   * a new Event doesn't have an id
   */
  saveEvent(event: any): Promise<Event> {
    // return this.httpClient.post<Event>('linkToRestApi', event).toPromise();
    const eventToSave = {
      id: event.id ?? Utils.fakeNumber().toString(),
      Date: event.Date ?? new Date().toISOString(), ...event
    };
    this.placeholderEvents = [eventToSave, ...this.placeholderEvents.filter(item => item.id !== event.id)];

    return new Promise(resolve => resolve(eventToSave));
  }

  removeEventById(id: string): Promise<void> {
    // return this.httpClient.delete<void>('linkToRestApi').toPromise();
    this.placeholderEvents = this.placeholderEvents.filter(item => item.id !== id);
    return new Promise(resolve => resolve());
  }

}
