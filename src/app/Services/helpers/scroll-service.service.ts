import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollServiceService {

  constructor() { }

  disableScroll() {
    document.documentElement.style.overflowY = 'hidden';
  }
  enableScroll() {
    document.documentElement.style.overflowY = 'auto';
  }
}
