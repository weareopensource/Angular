import { Directive, EventEmitter, ElementRef, HostListener, Input, Output } from '@angular/core';
import { each, filter, iteratee } from 'lodash';

function simpleKeys (original) {
  return Object.keys(original).reduce(function (obj, key) {
    obj[key] = typeof original[key] === 'object' ? '{ ... }' : original[key];
    return obj;
  }, {});
}

@Directive({
  selector: '[dropFiles]'
})
export class DropFilesDirective {

  @Input()
  public files: File[] = [];

  @Output()
  public fileOver: EventEmitter<any> = new EventEmitter();

  @Output()
  public fileDrop: EventEmitter<File[]> = new EventEmitter<File[]>();

  public constructor(private element: ElementRef) { }

  @HostListener('drop', ['$event'])
  public onDrop(event: DragEvent): void {
    const transfer = event.dataTransfer;
    if (!transfer) { return; }
    event.preventDefault();
    event.stopPropagation();
    this._addFiles(transfer.files);
    this.fileOver.emit(false);
    this.fileDrop.emit(this.files);
  }

  @HostListener('draenter', ['$event'])
  public onDragEnter(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.fileOver.emit(true);
  }

  @HostListener('dragover', ['$event'])
  public onDragOver(event: DragEvent): void {
    const transfer = event.dataTransfer;

    transfer.dropEffect = 'copy';
    event.preventDefault();
    event.stopPropagation();
    this.fileOver.emit(true);
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: DragEvent): any {
    event.preventDefault();
    event.stopPropagation();
    this.fileOver.emit(false);
  }

  private _addFiles(files: FileList): void {
    each(files, (file) => { if (this._fileCanBeAdded(file)) {
      this.files.push(file); }
    });
  }

  private _fileCanBeAdded(file: File): boolean {
    return (!this._fileIsAlreadyDropped(file) && this._fileTypeIsImage(file.type));
  }

  private _fileIsAlreadyDropped(file: File): boolean {
    return filter(this.files, iteratee(['name', file.name])).length > 0;
  }

  private _fileTypeIsImage(fileType: string): boolean {
    return (fileType === '' ? false : fileType.startsWith('image'));
  }

}
