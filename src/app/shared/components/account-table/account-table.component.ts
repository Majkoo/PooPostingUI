import { ChangeDetectorRef, Component, EventEmitter, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountDto } from '../../utility/dtos/AccountDto';
import { PagedResult } from '../../utility/dtos/PagedResult';
import { AccountService } from 'src/app/services/api/account/account.service';
import { catchError, tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'pp-account-table',
  templateUrl: './account-table.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class AccountTableComponent {
  
  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  entries: PagedResult<AccountDto> = {
    items: [],
    totalPages: 0,
    totalItems: 0,
    pageSize: 10,
    page: 1
  }

  @Output() selectedItems = new EventEmitter<string[]>();
  checkAllBoxes : boolean = false
  checked: string[] = []
  pages: number[] = []
  
  private accountService = inject(AccountService);

  refresh(){
    this.clearChecks()
    this.changePage(this.entries.page)
    this.selectedItems.emit(this.checked);
  }

  ngOnInit(){
    this.changePage(1)
  }

  changePage(page: number){
    this.accountService.getAccountsPaginated(this.entries.pageSize, page).pipe(
      tap((list: PagedResult<AccountDto>) => (this.entries = list, 
        this.entries.items.forEach(entry => entry.accountCreated = entry.accountCreated.split("T")[0]), 
        this.entries.page > this.entries.totalPages ? this.changePage(this.entries.totalPages) : this.cdr.detectChanges())),
      catchError(() => this.router.navigate([""], {queryParams: null}))
    )
    .subscribe();
  }

  changePageSize(pageSize: number){
    this.entries.pageSize = pageSize
    this.changePage(this.entries.page)
    this.clearChecks()
  }

  checkedEntry(id : string){
    let index = this.checked.indexOf(id)
    index == -1 ? this.checked.push(id) : this.checked.splice(index, 1)
    this.checkAllBoxes = this.checked.length == this.entries.pageSize;
    this.selectedItems.emit(this.checked);
  }

  checkedEverything(check : boolean){
    this.checked = []
    if(check){
      this.entries.items.forEach(item => {
        this.checked.push(item.id)
      })
    }
    this.selectedItems.emit(this.checked);
  }

  clearChecks(){
    this.checked = []
    this.checkAllBoxes = false
  }
}
