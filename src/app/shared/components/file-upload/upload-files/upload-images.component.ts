import { Component, OnInit, HostBinding } from '@angular/core';
import { UploadImagesService, FileDataSource, FileDatabase } from '../../../services';

@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.scss']
})
export class UploadImagesComponent implements OnInit {
  dataSource: FileDataSource | null;

  isDropZoneOver = false;
  files: File[] = [];

  @HostBinding('class.mat-typography')
  matTypo() { return true; }

  constructor(private database: FileDatabase) { }

  ngOnInit() {
    this.dataSource = new FileDataSource(this.database);
  }

  public fileOverDropZone(e: any): void {
    this.isDropZoneOver = e;
  }

 onFileDrop(e) {
  this.database.dataChange.next(e);
 }
}
