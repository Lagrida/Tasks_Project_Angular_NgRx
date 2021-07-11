import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AppFile } from 'src/app/models/full-task';
import { User } from 'src/app/models/user';
import { FilesService } from 'src/app/services/files.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-display-task',
  templateUrl: './display-task.component.html',
  styleUrls: ['./display-task.component.css']
})
export class DisplayTaskComponent implements OnInit {

  loadingUser: boolean = true;
  loadingSignatureFile: boolean = true;

  getSignatureFile: AppFile;
  getUserSigned: User;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public filesService: FilesService,
    private usersService: UsersService
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
    if(this.data.fullTask.task.type == 2){
      this.usersService.getOneUser(this.data.fullTask.task.signature.userSigned).subscribe((response: any) => {
        this.getUserSigned = response;
        this.loadingUser = false;
      });
      this.filesService.getOneFile(this.data.fullTask.task.signature.file).subscribe((response: any) => {
        this.getSignatureFile = response;
        this.loadingSignatureFile = false;
      });

    }
  }
}
