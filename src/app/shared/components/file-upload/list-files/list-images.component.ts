import { Component, OnInit, HostBinding } from '@angular/core';
import { UploadImagesService, FileDataSource, FileDatabase } from '../../../services';

@Component({
  selector: 'app-list-images',
  templateUrl: './list-images.component.html',
  styleUrls: ['./list-images.component.scss']
})
export class ListImagesComponent implements OnInit {

  displayedColumns = ['name'];
  dataSource: FileDataSource | null;
  isEnabledUpload = true;
  files: File[] = [];

  @HostBinding('class.mat-typography')
  matTypo() { return true; }

  constructor(private database: FileDatabase) { }

  ngOnInit() {
    this.dataSource = new FileDataSource(this.database);
  }

  uploadImagesToFirebase() {
    this.isEnabledUpload = false;
  }

 clearFiles() {
  this.files = [];
  this.isEnabledUpload = true;
 }

 remove() {
  this.files = [];
  this.isEnabledUpload = true;
 }
}
