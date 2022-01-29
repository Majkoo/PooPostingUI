import {Component, Input, OnInit} from '@angular/core';
import {Picture} from "../../../Models/Picture";
import {ConfigServiceService} from "../../services/singletons/config-service.service";
import {HttpPatchServiceService} from "../../services/http-patch-service.service";
import {AuthServiceService} from "../../services/singletons/auth-service.service";
import {HttpGetServiceService} from "../../services/http-get-service.service";

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.scss']
})
export class PictureComponent implements OnInit {

  constructor(
    private configService: ConfigServiceService,
    private patch: HttpPatchServiceService,
    private auth: AuthServiceService,
    private get: HttpGetServiceService) {
    this.IsUserLoggedOn = this.auth.isUserLogged();
  }

  IsUserLoggedOn?: boolean;
  @Input() picture!: Picture;

  ngOnInit(): void {
    if(!this.picture.url.startsWith("http")){
      this.picture.url = this.configService.picturesUrl + this.picture.url;
    }
  }

  like(){
    this.patch.like(this.picture.id)
      .subscribe({
        next: (value) => {
          this.get.getPicture(this.picture.id).subscribe({
            next: (value) => {
              this.picture.likes = value.likes;
              this.picture.dislikes = value.dislikes;
            }
          })
        },
        error: (err) => {
          console.error(err)
        }
      })
  }
  dislike(){
    this.patch.dislike(this.picture.id)
      .subscribe({
        next: (value) => {
          this.get.getPicture(this.picture.id).subscribe({
            next: (value) => {
              this.picture.likes = value.likes;
              this.picture.dislikes = value.dislikes;
            }
          })
        },
        error: (err) => {
          console.error(err)
        }
      })
  }

}
