import { ActivatedRoute, Router } from '@angular/router';
import { Inject, Component, OnInit, HostBinding } from '@angular/core';
import { NgxGalleryOptions } from 'ngx-gallery';
import { NgxGalleryImage } from 'ngx-gallery';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss'],
  })
  export class CommandEditComponent {

    constructor(private route: ActivatedRoute, private router: Router) { }

  }
