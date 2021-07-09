import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appFocusInvalidFields]'
})
export class FocusInvalidFieldsDirective {

  constructor(private element: ElementRef, private renderer: Renderer2) { }

  @HostListener('submit', ['$event']) onSubmit(event: Event){
    const firstInvalid = this.element.nativeElement.querySelector(".ng-invalid input");
    if(firstInvalid != null){
      firstInvalid.focus();
    }
  }

}
