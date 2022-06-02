import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-common-error',
  templateUrl: './common-error.component.html',
  styleUrls: ['./common-error.component.scss']
})
export class CommonErrorComponent implements OnInit {

  message:string | null = null;
  isSucess:boolean | null = null;
  image:string = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7c6f1009-9bed-42c1-90b2-5672c47100ef/d6dkl5d-ddacbd77-d4a7-4446-9b3f-1c5897ff028f.png/v1/fill/w_1024,h_1014,strp/one_piece_chopper_png_by_bloomsama_d6dkl5d-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTAxNCIsInBhdGgiOiJcL2ZcLzdjNmYxMDA5LTliZWQtNDJjMS05MGIyLTU2NzJjNDcxMDBlZlwvZDZka2w1ZC1kZGFjYmQ3Ny1kNGE3LTQ0NDYtOWIzZi0xYzU4OTdmZjAyOGYucG5nIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.YfQ56v39ldM6zpvZ4efO6lMcie9H7xe70C2bnqP506E";


  constructor(public modalRef: MdbModalRef<CommonErrorComponent>) { }

  ngOnInit(): void {
    if(!this.isSucess)
    {
      this.image = "https://cdn140.picsart.com/280279776029211.png";
    }
  }

}
