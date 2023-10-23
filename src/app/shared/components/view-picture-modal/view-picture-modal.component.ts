import {Component, HostListener, OnInit} from '@angular/core';
import {PictureDto} from "../../utility/dtos/PictureDto";
import {firstValueFrom} from "rxjs";
import {PictureService} from "../../../services/data-access/picture/picture.service";
import {Location, NgClass, NgForOf, NgIf, NgTemplateOutlet} from "@angular/common";
import {extractQueryParams} from "../../utility/extractQueryParams";
import {AccountInlineLinkComponent} from "../account-inline-link/account-inline-link.component";
import {UrlTransformModule} from "../../utility/pipes/url-transform/url-transform.module";
import {RouterLink} from "@angular/router";
import {TagComponent} from "../tag/tag.component";
import {LikeBtnComponent} from "../like-btn/like-btn.component";

@Component({
  selector: 'pp-view-picture-modal',
  templateUrl: './view-picture-modal.component.html',
  styleUrls: ['./view-picture-modal.component.scss'],
  standalone: true,
  imports: [
    AccountInlineLinkComponent,
    UrlTransformModule,
    NgTemplateOutlet,
    NgIf,
    RouterLink,
    NgForOf,
    NgClass,
    TagComponent,
    LikeBtnComponent
  ]
})
export class ViewPictureModalComponent implements OnInit {
  pic: PictureDto | undefined;
  isMobile = false;

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.updateTemplateDisplay();
  }

  constructor(
    private picService: PictureService,
    private location: Location,
  ) {
  }

  async ngOnInit() {
    this.updateTemplateDisplay();
    const queryParams = extractQueryParams(this.location.path());
    const picId = queryParams['viewPicture'];
    if (picId) {
      this.pic = await firstValueFrom(this.picService.getById(picId));
    }

  }

  private updateTemplateDisplay(): void {
    this.isMobile  = window.innerWidth < 768;
  }

}
