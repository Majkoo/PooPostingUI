import {Component, HostListener, inject, OnInit} from '@angular/core';
import {PostCardComponent} from "../../shared/components/post-card/post-card.component";
import {CreateAccountBannerComponent} from "../../shared/components/create-account-banner/create-account-banner.component";
import {PictureService} from "../../services/data-access/picture/picture.service";
import {NgForOf} from "@angular/common";
import {PictureDto} from "../../shared/utility/dtos/PictureDto";

@Component({
  selector: 'pp-home',
  templateUrl: './home.component.html',
  imports: [
    PostCardComponent,
    CreateAccountBannerComponent,
    NgForOf,
  ],
  standalone: true
})
export class HomeComponent implements OnInit {
  @HostListener("window:scroll", []) async onWindowScroll() {
    const windowHeight = window.innerHeight; // Height of the browser window
    const documentHeight = document.documentElement.scrollHeight;
    const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;

    const threshold = 200;

    if ((documentHeight - scrollPosition - windowHeight < threshold) && this.bottomDetectEnabled) {
      this.bottomDetectEnabled = false;
      await this.fetchPictures();
    }
  }

  private pictureService: PictureService = inject(PictureService);

  pageSize = 2;
  pageNumber = 1;
  items: PictureDto[] = [];
  bottomDetectEnabled = true;

  async ngOnInit() {
    await this.fetchPictures();
  }

  private async fetchPictures() {
    const res = await this.pictureService.get(this.pageSize, this.pageNumber);
    this.bottomDetectEnabled = true
    this.pageNumber = (res.page === res.totalPages) ? 1 : res.page + 1;
    this.items = [...this.items, ...res.items];
  }

}
