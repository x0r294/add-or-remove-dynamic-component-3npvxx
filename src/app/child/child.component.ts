import { Component, OnInit, ComponentRef } from '@angular/core';
import { ParentComponent } from '../parent/parent.component';

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
  public passid: IdentityInfo = {
    firstname: '',
    lastname: '',
    dob: '',
    passportnum: '',
  };
  public unique_key: number;
  public parentRef: ParentComponent;

  constructor() {}

  remove_me() {
    console.log(this.unique_key);
    this.parentRef.remove(this.unique_key);
  }
}
