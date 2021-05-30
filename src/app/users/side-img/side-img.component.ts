import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../dialog/dialog.component';

@Component({
  selector: 'app-side-img',
  templateUrl: './side-img.component.html',
  styleUrls: ['./side-img.component.css']
})
export class SideImgComponent implements OnInit {
  @Input() infos = {
    image:'',
    username:'',
    roles: [""]
  }
  constructor(public dialog: MatDialog) { }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '700px',
      data: {
        image: this.infos.image
      }
    });
  }
  ngOnInit(): void {
  }

}
