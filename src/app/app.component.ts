import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {SpinnerService} from "./services/state/spinner.service";
import {fadeInOutAnimation} from "./shared/utility/animations/fadeInOutAnimation";
@Component({
  selector: 'pp-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInOutAnimation]
})
export class AppComponent {
  private spinnerService = inject(SpinnerService);
  get isLoading() {
    return this.spinnerService.isLoading;
  }
}
