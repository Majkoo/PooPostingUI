import {ChangeDetectionStrategy, Component} from '@angular/core';
import {fadeInAnimation} from "./shared/utility/animations/fadeInAnimation";
@Component({
  selector: 'pp-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

    protected readonly fadeInAnimation = fadeInAnimation;
}
