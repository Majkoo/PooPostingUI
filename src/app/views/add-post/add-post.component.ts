import {Component, inject} from '@angular/core';
import {fadeInAnimation} from "../../shared/utility/animations/fadeInAnimation";
import {Router} from "@angular/router";

@Component({
  selector: 'pp-add-post',
  templateUrl: './add-post.component.html',
  styles: [
    `
      .step-heading {
        @apply block rounded-3xl py-2 px-3 text-white z-20;
      }
      .step-line {
        @apply absolute bottom-4 w-full h-2 z-10 bg-gradient-to-r from-cta to-primary-800 rounded;
      }
    `
  ],
  animations: [fadeInAnimation]
})
export class AddPostComponent {

  private router = inject(Router);

  get currentRoute() {
    const routes = this.router.url.split('/');
    return routes[routes.length-1];
  }

}
