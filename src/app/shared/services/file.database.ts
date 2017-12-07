import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';

@Injectable()
export class FileDatabase {
  public dataChange: BehaviorSubject<File[]> = new BehaviorSubject<File[]>([]);
  get data(): File[] {
    return this.dataChange.value;
  }
}
