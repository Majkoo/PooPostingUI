import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollServiceService {
  scrollTopState: number = 0;

  loadScrollState() {
    document.body.scrollTop = this.scrollTopState;
  }
  saveScrollState() {
    this.scrollTopState = document.body.scrollTop;
  }
  resetScrollState() {
    this.scrollTopState = 0;
  }
}
