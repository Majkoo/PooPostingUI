import { Component, inject, Input } from '@angular/core';
import { PictureDto } from '../../utility/dtos/PictureDto';
import { AuthService } from 'src/app/services/api/account/auth.service';
import { CommonModule } from '@angular/common';
import { AccountService } from 'src/app/services/api/account/account.service';
import { catchError, tap } from 'rxjs';
import { PictureService } from 'src/app/services/api/picture/picture.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'pp-mod-btn',
  templateUrl: './mod-btn.component.html',
  imports: [CommonModule],
  standalone: true
})
export class ModBtnComponent {
  @Input({required: true}) pic!: PictureDto;

  private authService = inject(AuthService);
  private accountService = inject(AccountService);
  private pictureService = inject(PictureService);
  private toastrService = inject(ToastrService);

  isAdmin: boolean | undefined;

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin;
  }

  banUser(){   
    this.accountService.banUserById(this.pic.account.id).pipe(
      catchError(async () => (this.toastrService.error("Something went wrong"))),
      tap(() => this.toastrService.success("User deleted"))
    )
    .subscribe();
  }

  deleteImage(){
    this.pictureService.delete(this.pic.id).pipe(
      tap(() => this.toastrService.success("Picture deleted")),
      catchError(async () => this.toastrService.error("Something went wrong"))
    )
    .subscribe()
  }
}
