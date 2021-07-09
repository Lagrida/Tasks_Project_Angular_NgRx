import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from 'src/app/services/users.service';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';

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
  constructor(public dialog: MatDialog, public userService: UsersService) { }
  openDialog(): void {
    this.dialog.open(ImageDialogComponent, {
      width: '700px',
      data: {
        image: this.infos.image
      }
    });
  }
  ngOnInit(): void {
  }

}
