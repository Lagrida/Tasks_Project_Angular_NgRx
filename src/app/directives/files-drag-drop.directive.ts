import { Directive, ElementRef, HostListener, Output, Renderer2, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appFilesDragDrop]'
})
export class FilesDragDropDirective {

  @Output() fileDropped : EventEmitter<any> = new EventEmitter();

  constructor(private element: ElementRef, private renderer: Renderer2) { }

  @HostListener('dragover', ['$event']) dragover(event: Event){
    event.preventDefault();
  }
  @HostListener('dragenter', ['$event']) dragenter(event: Event){
    event.preventDefault();
    this.renderer.addClass(this.element.nativeElement, 'drag-over');
  }
  @HostListener('dragleave', ['$event']) dragleave(event: Event){
    event.preventDefault();
    this.renderer.removeClass(this.element.nativeElement, 'drag-over');
  }
  @HostListener('drop', ['$event']) drop(event: any){
    event.preventDefault();
    this.renderer.removeClass(this.element.nativeElement, 'drag-over');

    const files = event.dataTransfer.files;

    this.fileDropped.emit(files);
  }

}
