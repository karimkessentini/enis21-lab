import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/services/event.service';
import { Event } from 'src/models/event.model';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {

  currentItemId: string;
  item: Event;
  form: FormGroup;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private eventService: EventService,
  ) { }

  ngOnInit(): void {
    
    this.currentItemId = this.activatedRoute.snapshot.params.id;
    if (!!this.currentItemId) {
      this.eventService.getEventById(this.currentItemId).then(item => {
        this.item = item;
        this.initForm(item)
      });
    } else {
      this.initForm(null);
    }
  }

  initForm(item: Event) {
    this.form = new FormGroup({

      id: new FormControl(item?.id, [Validators.required]),
      titre: new FormControl(item?.titre, [Validators.required]),
      Date: new FormControl(item?.Date, [Validators.required]),
      lieu: new FormControl(item?.lieu, [Validators.required]),
    });
  }


  isFormInEditMode(): boolean {
    return !!this.currentItemId;
  }

  onSubmit(): void {
    const objectToSubmit: Event = {...this.item, ...this.form.value};
    console.log(objectToSubmit);
    this.eventService.saveEvent(objectToSubmit).then(() => this.router.navigate(['./events']));

  }

}
