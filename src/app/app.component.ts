import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {SpinnerService} from "./services/state/spinner.service";
@Component({
  selector: 'pp-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private spinnerService = inject(SpinnerService);
  get isLoading() {
    return this.spinnerService.isLoadingBs;
  }
}
