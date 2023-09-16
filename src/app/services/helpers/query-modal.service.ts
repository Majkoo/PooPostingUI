import {inject, Injectable, Type} from '@angular/core';
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {Location} from "@angular/common";
import {ViewPictureModalComponent} from "../../shared/components/view-picture-modal/view-picture-modal.component";
import {extractQueryParams} from "../../shared/utility/extractQueryParams";

@Injectable({
  providedIn: 'root',
})
export class QueryModalService {
  dialogRef: DynamicDialogRef | undefined;

  private dialogService = inject(DialogService);
  private location = inject(Location);

  init() {
    this.location.onUrlChange(url => {
      const viewPictureParam = extractQueryParams(url)['viewPicture'];
      if (viewPictureParam) this.open(ViewPictureModalComponent);
      if (!url) this.close();
    });
    this.location.go(this.location.path());
  }

  open(component: Type<object>) {
    if (this.dialogService.dialogComponentRefMap.size !== 0) return;

    this.dialogRef = this.dialogService.open(
      component,
      {
        styleClass: "w-screen h-screen rounded-0 p-0",
        modal: true,
        showHeader: false,
    });

    this.dialogRef.onClose.subscribe(() => {
      this.location.replaceState('');
    })
  }

  close() {
    this.dialogRef?.close();
    this.location.replaceState('');
  }

}
