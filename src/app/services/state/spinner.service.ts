import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private _isLoading = false;

  set isLoading(val: boolean) {
    this._isLoading = val;
  }
  get isLoading() {
    return this._isLoading;
  }
}
