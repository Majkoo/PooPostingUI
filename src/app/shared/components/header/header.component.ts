import { Component } from '@angular/core';

@Component({
  selector: 'pp-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {

  scrollTop() {
    document.documentElement.scrollTop = 0;
  }
}
