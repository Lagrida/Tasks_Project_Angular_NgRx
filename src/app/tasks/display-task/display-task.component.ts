import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FilesService } from 'src/app/services/files.service';

@Component({
  selector: 'app-display-task',
  templateUrl: './display-task.component.html',
  styleUrls: ['./display-task.component.css']
})
export class DisplayTaskComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public filesService: FilesService
  ){}

  getType(type: number): string{
    switch(type){
      case 0:
        return 'Initial'
      break;
      case 1:
        return 'In progress'
      break;
      case 2:
        return 'Completed'
      break;
      default:
        return '';
    }
  }
  ngOnInit(): void {
  }
}
