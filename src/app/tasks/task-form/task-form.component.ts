import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { FileStatus } from 'src/app/models/file-status';
import { FullTask, TaskUser } from 'src/app/models/full-task';
import { Task } from 'src/app/models/task';
import { AppState } from 'src/app/reducers';
import { FilesService } from 'src/app/services/files.service';
import { UsersService } from 'src/app/services/users.service';
import { addNewTask, addTasksFileStatus, deleteTasksFileStatus, initFilesStatus, initTasksFileStatus, initUploadEnded, setTasksErrorMessage, toggleSubmitLoading, toggleTasksSuccess, updateTask } from '../store/tasks.actions';
import { getSubmitLoading, getSuccess, getTaskFilesStatus, getTasksErrorMessage } from '../store/tasks.selectors';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit, OnDestroy {

  @Input() fullTask: FullTask;

  @Input() isAdding: boolean;

  @ViewChild('container', { static: true })
  container: ElementRef<HTMLElement>;

  @ViewChild('container2', { static: true })
  container2: ElementRef<HTMLElement>;

  selectable = true;
  removable = true;

  separatorKeysCodes: number[] = [];

  selectedUsersStartedWith: TaskUser[] = [];
  usersStartedWith: TaskUser[] = [];

  @ViewChild('inputFile') inputFile: ElementRef;
  @ViewChild('usersStartWithInput') usersStartWithInput: ElementRef<HTMLInputElement>;

  form: any;

  filesStatus: Observable<FileStatus[]>;

  imgSrcs: Observable<any>[] = [];

  private filesList: DataTransfer = new DataTransfer();

  displayFiles: boolean = false;

  formSubmitted: boolean = false;

  loading: boolean = false;
  error: boolean = false;
  noResult: boolean = false;
  isError: boolean = false;

  taskAdded: Observable<boolean>;
  submitLoading: Observable<boolean>;
  errorMessage: Observable<string>;

  get getFilesList(){
    return [...this.filesList.files];
  }

  constructor(
    private formBuilder: FormBuilder,
    public filesService: FilesService,
    private usersService: UsersService,
    private store: Store<AppState>
  ){}

  ngOnInit(): void {
    this.selectedUsersStartedWith = [...this.fullTask.users];
    this.store.dispatch(setTasksErrorMessage({errorMessage : ""}));
    this.store.dispatch(toggleTasksSuccess({success : false}));
    this.store.dispatch(initUploadEnded());
    this.store.dispatch(initFilesStatus());

    this.taskAdded = this.store.select(getSuccess);
    this.submitLoading = this.store.select(getSubmitLoading);
    this.errorMessage = this.store.select(getTasksErrorMessage);
    this.filesStatus = this.store.select(getTaskFilesStatus);

    this.form = this.formBuilder.group({
      title: ['', {
        updateOn: 'submit',
        validators: [
          Validators.required,
          Validators.pattern(/^[\w\s]+$/)
        ]
      }],
      description: [''],
      //files: [''],
      usersStartedWith: ['', {
        updateOn: 'change'
      }]
    },{
      updateOn: 'submit'
    });
    this.form.patchValue({
      title: this.fullTask.task.title,
      description: this.fullTask.task.description,
    });
    this.form.get('usersStartedWith').valueChanges.pipe(
      debounceTime(400),
    ).subscribe((val: string) => {
      if(val == '' || val == null){
        this.noResult = false;
        this.isError = false;
        this.usersStartedWith = [];
      }
      else if (typeof val === 'string'){
        this._filter(val);
      }
    })
  }
  ngOnDestroy(): void{
    this.store.dispatch(initTasksFileStatus());
  }
  handleSubmit(){
    this.container.nativeElement.scrollTop = 0;

    this.store.dispatch(setTasksErrorMessage({ errorMessage: '' }));
    const values = this.form.value;
    this.formSubmitted = true;
    this.store.dispatch(toggleSubmitLoading({ submitLoading:true }));

    const users = this.selectedUsersStartedWith.map(el => el.id);
    const task: Task = new Task(values.title, values.description, users);
    if(this.isAdding){
      console.log('adding')
      // Adding
      this.store.dispatch(addNewTask({ task, files: this.getFilesList }));
    }else{
      //Updating
      console.log('updating')
      if(this.fullTask.task.id != null){
        this.store.dispatch(updateTask({ task, taskId: this.fullTask.task.id,files: this.getFilesList }));
      }
    }
  }
  deleteFile(fileName: string){
    this.store.dispatch(deleteTasksFileStatus({ fileName }));
    const findFileIndex = this.getFilesList.findIndex(el => el.name === fileName);
    this.filesList.items.remove(findFileIndex);
  }
  onFileDropped(files:any) {
    const theFiles = [...files];
    theFiles.forEach((file: File) => {
        this.filesList.items.add(file);
        if(this.filesService.isImage(file.type)){
          this.imgSrcs.push(this.filesService.getImageSource(file));
          const fileStatus: FileStatus = {
              name: file.name,
              status: 'Uploading...',
              percent: 0,
              class:'',
              srcId: (this.imgSrcs.length-1)
          }
          this.store.dispatch(addTasksFileStatus({ fileStatus }));
      }else{
          const fileStatus: FileStatus = {
              name: file.name,
              status: 'Uploading...',
              percent: 0,
              class:''
          }
          this.store.dispatch(addTasksFileStatus({ fileStatus }));
      }
    });
  }
  dropZoneClick(){
    this.inputFile.nativeElement.click();
  }
  addFiles(event: any){
    const theFiles = [...event.target.files];
    theFiles.forEach((file: File) => {
      if(this.filesService.isImage(file.type)){
        this.imgSrcs.push(this.filesService.getImageSource(file));
        const fileStatus: FileStatus = {
            name: file.name,
            status: 'Uploading...',
            percent: 0,
            class:'',
            srcId: (this.imgSrcs.length-1)
        }
        this.store.dispatch(addTasksFileStatus({ fileStatus }));
    }else{
        const fileStatus: FileStatus = {
            name: file.name,
            status: 'Uploading...',
            percent: 0,
            class:''
        }
        this.store.dispatch(addTasksFileStatus({ fileStatus }));
    }
        this.filesList.items.add(file);
    });
  }
  remove(userStartWith: TaskUser): void {
    const index = this.selectedUsersStartedWith.indexOf(userStartWith);
    if (index >= 0) {
      this.selectedUsersStartedWith.splice(index, 1);
    }
  }
  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedUsersStartedWith.push(event.option.value);
    this.usersStartWithInput.nativeElement.value = '';
  }
  private _filter(value: string){
    this.loading = true;
    this.noResult = false;
    this.isError = false;
    this.usersService.getUsersStartsWith(value).subscribe(
      (response: any) => {
        this.loading = false;
        let result: TaskUser[] = [];
        result = response;
        // Filter existing users
        this.usersStartedWith = result.filter(el => this.selectedUsersStartedWith.findIndex(el2 => el2.username === el.username) === -1);
        if(this.usersStartedWith.length == 0){
          this.noResult = true;
        }
      },
      (error: any) => {
        this.usersStartedWith = [];
        this.noResult = false;
        this.loading = false;
        this.isError = true;
      }
    );
  }
  add(event: any): void {
    event.chipInput!.clear();
    this.form.get('usersStartedWith').setValue(null);
  }
  toggleDisplayingFiles(): void{
    this.displayFiles = !this.displayFiles;
  }
}
