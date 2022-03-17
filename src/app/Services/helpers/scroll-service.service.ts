import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollServiceService {
  scrollTopState: number;

  constructor() {
    this.scrollTopState = 0;
  }

  scroll(val: number) {
    document.body.scrollTop = val;
  }

  saveScrollState(val: number) {
    this.scrollTopState = val;
  }
}
