import { Component, HostBinding, HostListener } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  @HostBinding('class.mat-typography')
  matTypo(): Boolean {
    return true;
  }

  @HostListener('dragover', ['$event'])
  stoprDragover(event): void {
    event.preventDefault();
  }

  @HostListener('drop', ['$event'])
  stopDrop(event): void {
    event.preventDefault();
  }

  constructor(private _mdIconRegistry: MatIconRegistry, private _sanitizer: DomSanitizer) {
    ['file', 'editor', 'action', 'navigation', 'av', 'image', 'content', 'hardware'].forEach(iconSet =>
      this._mdIconRegistry.addSvgIconSetInNamespace(
        iconSet,
        this._sanitizer.bypassSecurityTrustResourceUrl(`assets/svg-sprite-${iconSet}.svg`)
      )
    );
    this._mdIconRegistry.addSvgIcon('file-image', this._sanitizer.bypassSecurityTrustResourceUrl('assets/file.svg'));
  }
}
