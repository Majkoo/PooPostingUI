import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {Router} from "@angular/router";
import {HttpServiceService} from "../data-access/http-service.service";
import {AccountDto} from "../utils/dtos/AccountDto";
import {PictureDto} from "../utils/dtos/PictureDto";
import {UserState} from "../utils/models/userState";

@Injectable({
  providedIn: 'root'
})
export class AppCacheService {

  constructor(
    private router: Router,
    private httpService: HttpServiceService
  ) {
    this.loggedOnSubject.next(false);
  }

  mostPopularSite: number = 1;
  mostLikedSite: number = 1;
  newestSite: number = 1;
  randomSite: number = 1;

  loggedOnSubject: Subject<boolean> = new Subject<boolean>();
  cachedPictures: PictureDto[] = [];
  cachedUserAccount?: AccountDto;
  cachedUserInfo?: UserState;

  public cachePictures(pictures: PictureDto[]): void {
    pictures.forEach((p: PictureDto) => {
      if (!this.cachedPictures.some((r: PictureDto) => r.id == p.id)) {
        this.cachedPictures.push(p);
      }
      while (this.cachedPictures.length > 4) {
        this.cachedPictures.shift();
      }
    });
  }
  public purgeCachePictures(): void {
    this.cachedPictures = [];
  }
  public cacheUserAccount(account: AccountDto): void {
    this.cachedUserAccount = account;
  }
  public cacheUserInfo(userInfo: UserState): void {
    this.cachedUserInfo = userInfo;
    AppCacheService.saveLsJwtToken(userInfo.authToken);
    AppCacheService.saveLsJwtUid(userInfo.uid);
    this.loggedOnSubject.next(true);
  }

  public async updateUserAccount(): Promise<boolean> {
    if (!this.getUserInfo() && !this.getUserInfo()?.uid) return false;
    this.httpService.getAccountRequest(this.getUserInfo()!.uid)
      .subscribe({
        next: (v: AccountDto) => {
          this.cachedUserAccount = v;
          return true;
        }
      })
    return false;
  }

  public isUserAccountCached(): boolean {
    return this.cachedUserAccount !== undefined;
  }
  public arePicturesCached(): boolean {
    return this.cachedPictures.length !== 0;
  }

  public getCachedPictures(): PictureDto[] {
    return this.cachedPictures!;
  }
  public getCachedUserAccount(): AccountDto {
    return this.cachedUserAccount!;
  }

  public logout() {
    this.router.navigate(['auth/logged-out'])
      .then(() => {
        this.loggedOnSubject.next(false);
        this.cachedUserAccount = undefined;
        this.cachedUserInfo = undefined;
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('uid');
      });
  }

  getUserInfo(): UserState | undefined {
    return this.cachedUserInfo;
  }
  getUserLoggedOnState(): boolean {
    return this.getUserInfo()?.uid != null && this.getUserInfo()?.authToken != null;
  }
  cookiesAlertAccepted() {
    localStorage.setItem('cookiesAlertShown', 'true');
  }
  isCookiesAlertAccepted(): boolean {
    return localStorage.getItem('cookiesAlertShown') ? localStorage.getItem('cookiesAlertShown') === "true": false;
  }

  public getLsJwtToken() {
    return localStorage.getItem('jwtToken');
  }
  public getLsJwtUid() {
    return localStorage.getItem('uid');
  }

  private static saveLsJwtToken(val: string) {
    localStorage.setItem('jwtToken', val);
  }
  private static saveLsJwtUid(val: string) {
    localStorage.setItem('uid', val);
  }

}
