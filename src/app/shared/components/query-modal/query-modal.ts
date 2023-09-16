import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule, Location} from '@angular/common';
import {ActivatedRoute, Params, Router, RouterModule} from "@angular/router";
import {firstValueFrom, Subscription} from "rxjs";
import {DialogModule} from "primeng/dialog";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {CreateAccountBannerComponent} from "../create-account-banner/create-account-banner.component";
import {ViewPictureModalComponent} from "../view-picture-modal/view-picture-modal.component";
@Component({
  selector: 'pp-query-modal',
  templateUrl: './query-modal.html',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    RouterModule

  ],
  providers: [
    DialogService,
    RouterModule
  ]
})
export class QueryModalComponent implements OnInit, OnDestroy {
  dialogRef: DynamicDialogRef | undefined;
  masterSub: Subscription = new Subscription();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private dialogService: DialogService
  ){}

  async ngOnInit() {
    const initParams: Params = await firstValueFrom(this.route.queryParams);
    const viewPictureParam = initParams['viewPicture'];
    if (viewPictureParam) this.openViewPictureModal(viewPictureParam);

    this.location.onUrlChange(url => {
      const viewPictureParam = this.extractParams(url, 'viewPicture');
      if (viewPictureParam) this.openViewPictureModal(viewPictureParam);
    })
  }

  ngOnDestroy() {
    this.masterSub.unsubscribe();
  }

  openViewPictureModal(picId: string) {
    if (this.dialogService.dialogComponentRefMap.size !== 0) return;

    this.dialogRef = this.dialogService.open(ViewPictureModalComponent,
      {
        header: "Picture " + picId,
        styleClass: "w-screen h-screen m-0 top-0 bottom-0",
        modal: true,
      },
    );

    this.masterSub.add(
      this.dialogRef.onClose.subscribe(() => {
        this.location.replaceState('');
      })
    );

  }


  extractParams(inputString, paramName) {
    const pattern = new RegExp(`[?&]${paramName}=([^&]+)`);
    const match = inputString.match(pattern);

    if (match) {
      return match[1];
    } else {
      return null;
    }
  }

}
