import {ChangeDetectorRef, Component, inject, ViewChild} from '@angular/core';
import {AddPostService} from "../add-post.service";
import {CropperComponent} from "angular-cropperjs";
import {Router} from "@angular/router";
import {fadeInAnimation} from "../../../shared/utility/animations/fadeInAnimation";

@Component({
  selector: 'pp-upload',
  templateUrl: 'upload.component.html',
  styles: [
    `
    * {
      @apply transition-all duration-200 ease-in-out disabled:opacity-60;
    }
    `
  ],
  animations: [fadeInAnimation]
})
export class UploadComponent {
  @ViewChild('cropperComponent') cropperComponent!: CropperComponent;

  private addPostService = inject(AddPostService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  changeAspectRatio(val: number) {
    this.cropperComponent.cropper.setAspectRatio(val);
    this.cropperComponent.cropperOptions.aspectRatio = this.aspectRatio;
    this.addPostService.updatePictureUploadData({aspectRatio: val});
  }
  async onFileChange(event: Event) {
    if (!event) return;
    const target = event.target as HTMLInputElement;
    if (!target.files) return;
    await this.fileToUrl(target.files[0]);
  }
  fileToUrl(file: File): Promise<void> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        this.addPostService.updatePictureUploadData({rawFileUrl: reader.result as string});
        this.cdr.markForCheck();
        resolve();
      };
      reader.onloadend = () => {
        this.cropperComponent.ready.subscribe(() => {
          this.changeAspectRatio(4/3);
          this.cdr.markForCheck();
          resolve();
        })
      };
      reader.readAsDataURL(file);
    });
  }
  reset() {
    this.addPostService.updatePictureUploadData({
      rawFileUrl: '',
      croppedFileUrl: '',
    });
    this.cropperComponent.cropper.enable();
    this.addPostService.updatePictureUploadData({});
    this.cdr.markForCheck();
  }

  onCropBtnClick() {
    if (this.lockedIn) {
      this.cropperUnlock();
    } else {
      this.cropperCrop();
    }
  }
  onCropperReady() {
    this.cropperComponent.cropper.setAspectRatio(this.aspectRatio);
    this.cropperComponent.cropper.setCropBoxData(this.addPostService.cropBoxData);
    if (this.lockedIn) {
      this.cropperComponent.cropper.disable();
    }
  }
  async goNext() {
    if (this.canProceed) {
      await this.router.navigate(['/add-post/details'])
    }
  }
  private cropperCrop() {
    this.addPostService.updatePictureUploadData({
      aspectRatio: this.aspectRatio,
      cropBoxData: this.cropperComponent.cropper.getCropBoxData(),
      croppedFileUrl: this.cropperComponent.cropper.getCroppedCanvas().toDataURL(),
    })
    this.cropperComponent.cropper.disable();
    this.cdr.markForCheck();
  }
  private cropperUnlock() {
    this.resetCroppedFileUrl();
    this.cropperComponent.cropper.enable();
    this.cropperComponent.cropper.setCropBoxData(this.addPostService.cropBoxData);
    this.cdr.markForCheck();
  }
  private resetCroppedFileUrl() {
    this.addPostService.updatePictureUploadData({croppedFileUrl: ''});
  }
  get canProceed() {
    return this.lockedIn && this.addPostService.canGoToDetails;
  }
  get lockedIn() {
    return this.croppedFileUrl != '';
  }
  get rawFileUrl() {
    return this.addPostService.pictureUploadData.rawFileUrl;
  }
  get croppedFileUrl() {
    return this.addPostService.pictureUploadData.croppedFileUrl;
  }
  get aspectRatio() {
    return this.addPostService.pictureUploadData.aspectRatio;
  }
  get cropBoxSelected(): boolean {
    const cropbox = this.cropperComponent?.cropper?.getCropBoxData();
    return !!cropbox?.top && !!cropbox.width
  }
}
