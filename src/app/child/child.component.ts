import { Component, OnInit, ComponentRef } from '@angular/core';
import { ParentComponent } from '../parent/parent.component';
import {
  HttpClientModule,
  HttpClient,
  HttpRequest,
  HttpResponse,
  HttpEventType,
} from '@angular/common/http';

interface IdentityInfo {
  firstname: string;
  lastname: string;
  dob: string;
  passportnum: string;
}
@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css'],
})
export class ChildComponent {
  percentDone: number;
  uploadSuccess: boolean;
  public passid: IdentityInfo = {
    firstname: '',
    lastname: '',
    dob: '',
    passportnum: '',
  };
  public unique_key: number;
  public parentRef: ParentComponent;

  constructor(private http: HttpClient) {}

  version: any = '5.0';

  upload(files: File[]) {
    //pick from one of the 4 styles of file uploads below
    this.uploadAndProgress(files);
  }

  basicUpload(files: File[]) {
    var formData = new FormData();
    Array.from(files).forEach((f) => formData.append('file', f));
    this.http.post('https://file.io', formData).subscribe((event) => {
      console.log('done');
    });
  }

  //this will fail since file.io dosen't accept this type of upload
  //but it is still possible to upload a file with this style
  basicUploadSingle(file: File) {
    this.http.post('https://file.io', file).subscribe((event) => {
      console.log('done');
    });
  }

  uploadAndProgress(files: File[]) {
    console.log(files);
    var formData = new FormData();
    Array.from(files).forEach((f) => formData.append('file', f));

    this.http
      .post('https://file.io', formData, {
        reportProgress: true,
        observe: 'events',
      })
      .subscribe((event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.percentDone = Math.round((100 * event.loaded) / event.total);
        } else if (event instanceof HttpResponse) {
          this.uploadSuccess = true;
        }
      });
  }

  //this will fail since file.io dosen't accept this type of upload
  //but it is still possible to upload a file with this style
  uploadAndProgressSingle(file: File) {
    this.http
      .post('https://file.io', file, {
        reportProgress: true,
        observe: 'events',
      })
      .subscribe((event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.percentDone = Math.round((100 * event.loaded) / event.total);
        } else if (event instanceof HttpResponse) {
          this.uploadSuccess = true;
        }
      });
  }

  remove_me() {
    console.log(this.unique_key);
    this.parentRef.remove(this.unique_key);
  }
}
