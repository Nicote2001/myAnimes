import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-common-error',
  templateUrl: './common-error.component.html',
  styleUrls: ['./common-error.component.scss']
})
export class CommonErrorComponent implements OnInit {

  message:string | null = null;

  constructor(public modalRef: MdbModalRef<CommonErrorComponent>) { }

  ngOnInit(): void {
  }

}
