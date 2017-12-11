import { Component, HostListener, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

@Component({
  selector: 'application-root',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ApplicationComponent {

  @HostBinding('class.mat-typography')
  matTypo() {
    return true;
  }

  @HostListener('dragover', ['$event'])
  stoprDragover(event) {
    event.preventDefault();
  }

  @HostListener('drop', ['$event'])
  stopDrop(event) {
    event.preventDefault();
  }

  constructor(
    private mdIconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    ['file', 'editor', 'action', 'navigation', 'av', 'image', 'content']
    .forEach(iconSet =>
      mdIconRegistry.addSvgIconSetInNamespace(iconSet, sanitizer.bypassSecurityTrustResourceUrl(`assets/svg-sprite-${iconSet}.svg`
    )));
    mdIconRegistry.addSvgIcon('file-image', sanitizer.bypassSecurityTrustResourceUrl(`assets/file.svg`));
  }
}
