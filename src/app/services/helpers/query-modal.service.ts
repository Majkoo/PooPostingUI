import { Injectable, Type } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Location } from '@angular/common';
import { ViewPictureModalComponent } from '../../shared/components/view-picture-modal/view-picture-modal.component';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class QueryModalService {
  dialogRef: DynamicDialogRef | undefined;

  constructor(
    private dialogService: DialogService,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  init() {
    this.router.events.subscribe((e) => {
      const viewPictureParam = this.route.snapshot.queryParamMap.get('viewPicture');
      if (viewPictureParam) {
        this.open(ViewPictureModalComponent);
      } else {
        this.close();
      }
    });
  }

  open(component: Type<object>) {
    if (this.dialogService.dialogComponentRefMap.size !== 0) return;
    this.dialogRef = this.dialogService.open(component, {
      styleClass: 'w-screen h-screen rounded-0 p-0',
      modal: true,
      showHeader: false,
    });
  }

  close() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
