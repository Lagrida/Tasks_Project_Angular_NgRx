import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.css']
})
export class OverlayComponent implements OnInit, OnDestroy {

  //@Input() show : boolean | null = true;
  private _show: boolean | null = true;
  get show(): boolean | null {
    return this._show;
  }
  @Input('show')
  set show(val: boolean | null) {
    this._show = val;
    this.applyChanges();
  }
  resize$: Subscription;

  @ViewChild('node1', { static: true })
  node1: ElementRef<HTMLElement>;

  @ViewChild('node2', { static: true })
  node2: ElementRef<HTMLElement>;

  constructor() { }
  ngOnDestroy(): void {
    this.resize$.unsubscribe();
  }
  ngOnInit(): void {
    this.resize$ = fromEvent(window, 'resize').pipe(
      map((event: any) => {
        this.applyChanges();
      })
    ).subscribe();
  }
  applyChanges(){
    if(this._show){
      this.node2.nativeElement.style.top = this.node1.nativeElement.offsetTop + 'px';
      this.node2.nativeElement.style.left = this.node1.nativeElement.offsetLeft  + 'px';
      this.node2.nativeElement.style.width = this.node1.nativeElement.offsetWidth + 'px';
      this.node2.nativeElement.style.height = this.node1.nativeElement.offsetHeight + 'px';
    }else{
      this.node2.nativeElement.style.top = '0px';
      this.node2.nativeElement.style.left = '0px';
      this.node2.nativeElement.style.width = '0px';
      this.node2.nativeElement.style.height = '0px';
    }
  }
}
