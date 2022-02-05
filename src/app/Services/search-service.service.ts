import { Injectable } from '@angular/core';
import { SearchOptions } from 'src/app/Models/SearchOptions';

@Injectable({
  providedIn: 'root'
})
export class SearchServiceService {
  searchOptions: SearchOptions = {
    searchPhrase: "",
  }

  setSearchPhrase(val: string) {
    this.searchOptions.searchPhrase = val;
  }
}
