import { ActivatedRoute, Router } from '@angular/router';
import { Inject, Component, OnInit, HostBinding } from '@angular/core';
import { NgxGalleryOptions } from 'ngx-gallery';
import { NgxGalleryImage } from 'ngx-gallery';
import { ApplicationState, fromApplication } from 'app/application/+store';
import { Store } from '@ngrx/store';

@Component({
    selector: 'app-command-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss'],
  })
  export class CommandDetailComponent implements OnInit {

    constructor(private route: ActivatedRoute, private store: Store<ApplicationState>) { }

    public galleryOptions: NgxGalleryOptions[];
    public galleryImages: NgxGalleryImage[];

    ngOnInit(): void {
      this.galleryOptions = [{
        'preview': false,
 //       'breakpoint': 500,
        'width': '500px',
 //       'height': '300px',
        'thumbnailsRows': 1,
        'thumbnailsColumns': 3
      }];

      this.galleryImages = [{
        small: 'assets/1-small.jpg',
        medium: 'assets/1-medium.jpg',
        big: 'assets/1-big.jpg'
      }, {
        small: 'assets/2-small.jpg',
        medium: 'assets/2-medium.jpg',
        big: 'assets/2-big.jpg'
      }, {
        small: 'assets/3-small.jpg',
        medium: 'assets/3-medium.jpg',
        big: 'assets/3-big.jpg'
      }, {
        small: 'assets/2-small.jpg',
        medium: 'assets/2-medium.jpg',
        big: 'assets/2-big.jpg'
      }];
    }

    close() {
      this.store.dispatch(new fromApplication.Back());
      //this.router.navigate(['..'], {relativeTo: this.route});
    }
  }
