import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountDto } from '../../utility/dtos/AccountDto';
import { PagedResult } from '../../utility/dtos/PagedResult';

@Component({
  selector: 'pp-table-pagination',
  templateUrl: './table-pagination.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class TablePaginationComponent {
  @Input({required: true}) entries!: PagedResult<AccountDto>
  @Output() newPage = new EventEmitter<number>();
  @Output() newPageSize = new EventEmitter<number>();
  @Output() sendChecks = new EventEmitter<string[]>();
  checkAllBoxes : boolean = false
  // checkTopBox : boolean = false
  checked: string[] = []
  pages: number[] = []
  
  constructor(
    private cdr: ChangeDetectorRef
  ) {}

  ngOnChanges(){
    this.pages = []
    this.pages.push
    // ????
  }

  checkedEntry(id : string){
    let index = this.checked.indexOf(id)
    if(index > -1){
      if(this.checked.length == this.entries.pageSize){this.checkAllBoxes = false}
      this.checked.splice(index,1)
    }
    else{
      this.checked.push(id)
      if(this.checked.length == this.entries.pageSize){this.checkAllBoxes = true}
    }
  }

  checkedEverything(check : boolean){
    this.checked = []
    if(check){
      this.entries.items.forEach(item => {
        this.checked.push(item.id)
      })
    }
  }

  outputChecks(){
    this.sendChecks.emit(this.checked);
  }
}
