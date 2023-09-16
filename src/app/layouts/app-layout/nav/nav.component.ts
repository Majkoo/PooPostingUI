import { Component } from '@angular/core';

@Component({
  selector: 'pp-nav',
  template: `
    <nav class="pp-shadow">

      <div class="nav cont">
        <a class="icon icon-trending nav-link">
          <span>Trending</span>
        </a>

        <a class="icon icon-heart--filled nav-link">
          <span>Liked</span>
        </a>

        <a class="icon icon-add-post nav-link">
          <span>Add post</span>
        </a>

        <a class="icon icon-search nav-link">
          <span>Search</span>
        </a>

        <a class="icon icon-setting nav-link">
          <span>Settings</span>
        </a>
      </div>

    </nav>
  `,
  styles: [`
    nav {
      @apply
      bottom-0 fixed w-full z-30 bg-surface-100 px-4
      rounded-t-xl
      sm:hidden
    }
    .nav {
      @apply
      h-full w-full sticky
      flex flex-row items-center justify-between
      w-full h-14 fixed
    }
    .nav-link {
      @apply
      sm:w-full sm:flex sm:w-max sm:h-full
      sm:text-dark sm:font-bold
      sm:px-2 sm:py-2
    }
  `]
})
export class NavComponent {

}
