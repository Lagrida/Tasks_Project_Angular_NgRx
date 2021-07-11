import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, fromEvent, Observable, of } from 'rxjs';
import { distinctUntilChanged, map, take } from 'rxjs/operators';
import { filesService } from '../backend';
import { AppFile } from '../models/full-task';

export interface FileObs {
    fileName: string,
    event: HttpEvent<any>
}

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(private http: HttpClient) { }

  uploadTaskFile(file: File, taskId: number): Observable<any>{
    const url = filesService + "add_file_task/" + taskId;
    const formData: FormData = new FormData();
    formData.append('file', file);
    const obs1$ = of(file.name);
    const obs2$ = this.http.post<any>(url, formData, {
      reportProgress: true,
      responseType: 'json',
      observe: 'events'
    });
    return combineLatest([obs1$, obs2$]).pipe(
        map(([val1, val2]) => {
          const combine : FileObs = {
            fileName: val1,
            event: val2
          };
          return combine;
        })
    );
  }
  getOneFile(fileName: string): Observable<AppFile>{
    const url = filesService + 'get_file/' + fileName;
    return this.http.get<AppFile>(url);
  }
  uploadTaskSignatureFile(file: File, taskId: number): Observable<any>{
    const url = filesService + "add_signature_task/" + taskId;
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(url, formData, {
        reportProgress: true,
        responseType: 'json',
        observe: 'events'
    });
  }
  removeExtension(title: string){
    let titleArr = title.split('.');
    titleArr.pop();
    return titleArr.join('');
  }
  bigTitle(title: string){
    const limit = 30;
    if(title.length <= limit){
        return title;
    }
    const newTitle = title.substr(0, limit-1) + '...';
    return newTitle;
  }
  getSize(size: number){
    const withKb = size/1024;
    if(withKb < 512){
        return withKb.toPrecision(3) + 'Kb';
    }
    const withMb = withKb/1024;
    return withMb.toPrecision(3) + 'Mb';
  }
  isImage(type: string): boolean{
      return type.startsWith('image/');
  }
  isImage2(extension: string): boolean{
    return ['png', 'jpg', 'jpeg', 'gif'].includes(extension);
  }
  getPath(fileDirectory: string):string{
    return fileDirectory.replace('\\', '/');
  }
  getSource2(fileDirectory: string, fileName: string, extension: string): string{
    const url = filesService + fileDirectory + '/' + fileName + '.' + extension;
    return url;
  }
  getImageSource(file: File): Observable<any>{
    const reader = new FileReader();
    reader.readAsDataURL(file);
    const obs$ = fromEvent(reader, 'load').pipe(
      take(1),
      distinctUntilChanged(),
      map((event: any) => {
        return reader.result;
      })
    );
    return obs$;
  }
  mimeTypes(mime: string){
    switch(mime){
        case 'video/x-msvideo':
            return 'avi';
        break;
        case 'text/css':
            return 'css';
        break;
        case 'text/csv':
            return 'csv';
        break;
        case 'application/msword':
            return 'doc';
        break;
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            return 'docx';
        break;
        case 'image/gif':
            return 'gif';
        break;
        case 'text/html':
            return 'html'; // htm, html
        break;
        case 'application/java-archive':
            return 'jar';
        break;
        case 'image/jpeg':
            return 'jpeg'; //jpg, jpeg
        break;
        case 'text/javascript':
            return 'js';
        break;
        case 'application/x-javascript':
            return 'js';
        break;
        case 'application/json':
            return 'json';
        break;
        case 'audio/mpeg':
            return 'mp3';
        break;
        case 'video/mp4':
            return 'mp4';
        break;
        case 'image/png':
            return 'png';
        break;
        case 'application/pdf':
            return 'pdf';
        break;
        case 'application/x-httpd-php':
            return 'php';
        break;
        case 'application/vnd.ms-powerpoint':
            return 'ppt';
        break;
        case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
            return 'pptx';
        break;
        case 'application/vnd.rar':
            return 'rar';
        break;
        case 'image/svg+xml':
            return 'svg';
        break;
        case 'text/plain':
            return 'txt';
        break;
        case 'audio/wav':
            return 'wav';
        break;
        case 'application/xhtml+xml':
            return 'xhtml';
        break;
        case 'application/vnd.ms-excel':
            return 'xls';
        break;
        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
            return 'xlsx';
        break;
        case 'application/xml':
            return 'xml';
        break;
        case 'application/zip':
            return 'zip';
        break;
        case 'application/x-zip-compressed':
            return 'zip';
        break;
        default:
            return 'file';
        break;
    }
  }
}
