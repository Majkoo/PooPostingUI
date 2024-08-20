import {ChangeDetectionStrategy, Component, inject, Renderer2} from '@angular/core';
import {SpinnerService} from "./services/state/spinner.service";
import { SettingsService } from './services/api/settings/settings.service';
@Component({
  selector: 'pp-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private spinnerService = inject(SpinnerService);
  private settingsService = inject(SettingsService);

  constructor(private renderer: Renderer2) {}

  get isLoading() {
    return this.spinnerService.isLoadingBs;
  }

  ngAfterViewInit() {
    if(this.settingsService.getDarkModeSetting()){
      this.renderer.addClass(document.body, 'dark');
    }
  }
}
