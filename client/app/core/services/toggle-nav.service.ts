import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ToggleNavService {
  private toggled:boolean = false;
  private subject = new Subject<boolean>();
  public toggle$ ;
  constructor() {
    this.toggle$ = this.subject.asObservable();
  }

  toggle(): Observable<boolean> {
    this.toggled=!this.toggled;
    this.subject.next(this.toggled);
    return this.toggle$;
  }

}
