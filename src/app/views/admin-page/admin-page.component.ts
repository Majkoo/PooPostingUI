import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap } from 'rxjs';
import { AccountService } from 'src/app/services/api/account/account.service';
import { SpinnerService } from 'src/app/services/state/spinner.service';
import { TablePaginationComponent } from 'src/app/shared/components/table-pagination/table-pagination.component';
import { AccountDto } from 'src/app/shared/utility/dtos/AccountDto';
import { PagedResult } from 'src/app/shared/utility/dtos/PagedResult';

@Component({
  selector: 'pp-admin-page',
  standalone: true,
  templateUrl: './admin-page.component.html',
  imports: [TablePaginationComponent]
})
export class AdminPageComponent {
  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}
  entries: PagedResult<AccountDto> = {
    items: [],
    totalPages: 0,
    totalItems: 0,
    pageSize: 15,
    page: 0
  }
  
  private accountService = inject(AccountService);
  private toastrService = inject(ToastrService);
  
  ngOnInit() {
    this.accountService.getAccountsPaginated(this.entries.pageSize, 1).pipe(
      tap((list: PagedResult<AccountDto>) => (this.entries = list, this.entries.pageSize = 15, this.entries.items.forEach(entry => entry.accountCreated = entry.accountCreated.split("T")[0]), this.cdr.detectChanges())),
      catchError(() => this.router.navigate([""], {queryParams: null}))
    )
    .subscribe();
  }

  changePage(page: number){
    page = Math.max(1, Math.min(page, this.entries.totalPages));
    this.accountService.getAccountsPaginated(this.entries.pageSize, page).pipe(
      tap((list: PagedResult<AccountDto>) => (this.entries = list, 
        this.entries.items.forEach(entry => entry.accountCreated = entry.accountCreated.split("T")[0]), 
        this.entries.page > this.entries.totalPages ? this.changePage(this.entries.totalPages) : this.cdr.detectChanges())),
      catchError(() => this.router.navigate([""], {queryParams: null}))
    )
    .subscribe();
  }

  banUsers(ids: string[]){
    let anyError = false
    ids.forEach(id => {
      this.accountService.banUserById(id).pipe(
        tap((a: any) => (this.entries.items.splice(this.entries.items.indexOf(this.entries.items.find(entry => entry.id == id)!),1), this.cdr.detectChanges(), this.changePage(this.entries.page))),
        catchError(async () => (this.toastrService.error("Something went wrong"), anyError=true))
      )
      .subscribe();
    })
    if (!anyError) {this.toastrService.success("Slut")}
  }

  changePageSize(pageSize: number){
    this.entries.pageSize = pageSize
    this.changePage(this.entries.page)
    this.entries.pageSize = pageSize
  }
}
