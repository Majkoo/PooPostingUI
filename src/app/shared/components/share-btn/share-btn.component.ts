import { Component, inject, Input } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import {Clipboard} from '@angular/cdk/clipboard';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'pp-share-btn',
  templateUrl: './share-btn.component.html',
  imports: [DialogModule],
  standalone: true
})
export class ShareBtnComponent {
  @Input({required: true}) imageId: string = ""
  @Input({required: true}) creatorName: string = ""

  dialogVisible: boolean = false;
  postUrl: string = "";

  private clipboard = inject(Clipboard)
  private toastrService = inject(ToastrService)

  ngOnInit(){
    this.postUrl = `${environment.appWebUrl}/?picture=${this.imageId}`
  }

  showDialog() {
      this.dialogVisible = true;
  }

  copyLink(){
    this.clipboard.copy(this.postUrl)
    this.toastrService.success("link copied");
  }

  shareTwitter(){
    window.open(`https://twitter.com/share?text=See%20this%20poo%20post%20by%20${this.creatorName}%20&url=${this.postUrl}`, "_blank")
  }
  shareEmail(){
    window.open(`mailto:?subject=See this poo post on ${environment.appWebUrl}&body=Check out this poo post ${this.postUrl}, created by ${this.creatorName} `);
  }
  shareTelegram(){
    window.open(`https://t.me/share/url?url=${environment.appWebUrl}&text=Check out this poo post ${this.postUrl}, created by ${this.creatorName}!`);
  }
  shareFacebook(){
    window.open(`https://www.facebook.com/sharer/sharer.php?kid_directed_site=0&sdk=joey&u=${this.postUrl}&display=popup&ref=plugin&src=share_button`);
  }
}
