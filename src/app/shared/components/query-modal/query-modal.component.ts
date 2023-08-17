import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, Params} from "@angular/router";
import {QueryModalAction} from "../../utility/types/QueryModalAction";
@Component({
  selector: 'pp-query-modal',
  templateUrl: './query-modal.component.html',
  standalone: true,
  imports: [
    CommonModule,
  ],
})
export class QueryModalComponent implements OnInit {

  private route: ActivatedRoute = inject(ActivatedRoute);

  action?: QueryModalAction;

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(next => this.updateModal(next));
  }

  private updateModal(next: Params) {
    const action = next['action'];
    switch (action) {

      case "view":
      case "settings":
        this.action = action;
        break;

      default:
        this.action = undefined;
    }
  }

}
