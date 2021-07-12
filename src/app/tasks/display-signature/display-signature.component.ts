import { Component, ElementRef, Inject, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { FileStatus } from 'src/app/models/file-status';
import { AppState } from 'src/app/reducers';
import { addTasksFileStatus, addTaskSignature, initFilesStatus, setTasksErrorMessage, toggleSubmitLoading } from '../store/tasks.actions';
import { getSubmitLoading, getTaskFilesStatus, getTasksErrorMessage } from '../store/tasks.selectors';

@Component({
  selector: 'app-display-signature',
  templateUrl: './display-signature.component.html',
  styleUrls: ['./display-signature.component.css']
})
export class DisplaySignatureComponent implements OnInit, OnDestroy {

  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;

  mousemove$: Subscription;
  mousedown$: Subscription;
  mouseup$: Subscription;
  mouseleave$: Subscription;

  filesStatus: Observable<FileStatus[] | []>;
  submitLoading: Observable<boolean>;
  errorMessage: Observable<string>;

  constructor(
    private ngZone: NgZone,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store<AppState>
  ){}

  ngOnDestroy(): void{
    this.mousemove$.unsubscribe();
    this.mousedown$.unsubscribe();
    this.mouseup$.unsubscribe();
    this.mouseleave$.unsubscribe();

    //this.store.dispatch(initFilesStatus());
  }
  getImageFile(): File | null {
    const arr = this.canvas.nativeElement.toDataURL().split(',');
      const mime = arr[0].match(/:(.*?);/);
      if(mime != null){
        const mimee = mime[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        let u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        const file: File = new File([u8arr], "filename.png", {type: "image/png"});
        return file;
      }
      return null;
  }
  addSignature(): void {
    this.store.dispatch(toggleSubmitLoading({ submitLoading: true }));
    const taskId: number = this.data.taskId;
    const file: File | null = this.getImageFile();
    if(file != null && taskId != null){
      const fileStatus: FileStatus = {
        name: file.name,
        status: 'Uploading...',
        percent: 0,
        class:''
      }
      this.store.dispatch(addTasksFileStatus({ fileStatus }));
      this.store.dispatch(addTaskSignature({ file, taskId }));
    }
    //const file
  }
  resetCanvas(): void{
    const context: CanvasRenderingContext2D | null = this.canvas.nativeElement.getContext('2d');
    if(context != null){
      context.beginPath();
      context.fillStyle = 'white';
      context.fillRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    }
  }
  ngOnInit(): void {
    this.store.dispatch(setTasksErrorMessage({errorMessage : ""}));
    this.store.dispatch(initFilesStatus());
    this.store.dispatch(toggleSubmitLoading({ submitLoading: false }));

    this.submitLoading = this.store.select(getSubmitLoading);
    this.errorMessage = this.store.select(getTasksErrorMessage);
    this.filesStatus = this.store.select(getTaskFilesStatus);

    const canvas = this.canvas.nativeElement;
    const context: CanvasRenderingContext2D | null = this.canvas.nativeElement.getContext('2d');

    const canvasBoundries = canvas.getBoundingClientRect();

    const canvasOffsetLeft = canvasBoundries.x;
    const canvasOffsetTop = canvasBoundries.top;

    this.ngZone.runOutsideAngular(() => {

      const extension = 'png';

      const parameters = {
        backgroundType: 1,
        backgroundColor: '#FFFFFF',
        lineColor: '#000000',
        lineWidth: 4
      }
      let drawing = false;

      let mouseCoordinate = {
          x : 0,
          y : 0
      }
      let mouseLastCoordinate = {
          x : 0,
          y : 0
      }
      if(context != null){
        context.beginPath();
        context.fillStyle = 'white';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.strokeStyle = parameters.lineColor;
        context.lineWidth = parameters.lineWidth;

        this.mousemove$ = fromEvent(canvas, 'mousemove').pipe(
          map((event: any) => {
            event.preventDefault();
            event.stopPropagation();
            mouseLastCoordinate.x = mouseCoordinate.x;
            mouseLastCoordinate.y = mouseCoordinate.y;
  
            mouseCoordinate.x = event.pageX - canvasOffsetLeft;
            mouseCoordinate.y = event.pageY - canvasOffsetTop;
  
            if(drawing){
                draw();
            }
          })
        ).subscribe();

        this.mousedown$ = fromEvent(canvas, 'mousedown').pipe(
          map((event: any) => {
            drawing = true;
            draw();
          })
        ).subscribe();

        this.mouseup$ = fromEvent(canvas, 'mouseup').pipe(
          map((event: any) => {
            drawing = false;
          })
        ).subscribe();

        this.mouseleave$ = fromEvent(canvas, 'mouseleave').pipe(
          map((event: any) => {
            drawing = false;
          })
        ).subscribe();

        function draw(){
          if(context != null){
            context.beginPath();
            context.moveTo(mouseCoordinate.x, mouseCoordinate.y);
            context.lineTo(mouseLastCoordinate.x, mouseLastCoordinate.y);
            context.stroke();
            context.closePath();
          }
        }
      }
    });

  }

}
