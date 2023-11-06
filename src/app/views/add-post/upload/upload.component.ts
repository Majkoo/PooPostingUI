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

  post = this.addPostService.post;

  changeAspectRatio(val: number) {
    this.cropperComponent.cropper.setAspectRatio(val);
    this.cropperComponent.cropperOptions.aspectRatio = this.aspectRatio;
    this.addPostService.updateFileAspectRatio(val);
  }

  async onFileChange(event: Event) {
    if (!event) return;
    const target = event.target as HTMLInputElement;
    if (!target.files) return;
    await this.fileToUrl(target.files[0]);
    this.cdr.markForCheck();
  }

  fileToUrl(file: File): Promise<void> {
    return new Promise((resolve) => {
      const reader = new FileReader();

      reader.onload = () => {
        this.addPostService.updateFileUrl(reader.result as string);
        this.cdr.markForCheck();
        resolve();
      };

      reader.readAsDataURL(file);
    });
  }

  reset() {
    this.post.file = '';
    this.cropperComponent.cropper.enable();
    this.addPostService.updateFileUrl('');
    this.cdr.markForCheck();
  }

  cropperCrop() {
    this.post.file = this.cropperComponent.cropper.crop().getCroppedCanvas().toDataURL();
    this.cropperComponent.cropper.disable();
    this.cdr.markForCheck();
  }

  async goNext() {
    if (this.canProceed) {
      this.addPostService.updatePost(this.post);
      await this.router.navigate(['/add-post/details'])
    }
  }

  get canProceed() {
    return this.lockedIn && this.addPostService.canGoToDetails;
  }

  get lockedIn() {
    return this.post.file;
  }

  get fileUrl() {
    return this.addPostService.fileUrl;
  }

  get aspectRatio() {
    return this.addPostService.fileAspectRatio;
  }
}
