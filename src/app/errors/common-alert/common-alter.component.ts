import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-common-alert',
  templateUrl: './common-alert.component.html',
  styleUrls: ['./common-alert.component.scss']
})
export class CommonAlertComponent implements OnInit {

  title:string | null = null;
  synopsis: string | null = null;
  image:string | null = null;


  constructor(public modalRef: MdbModalRef<CommonAlertComponent>) { }

  ngOnInit(): void {
  }

}
