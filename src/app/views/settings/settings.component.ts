import { Component, inject } from '@angular/core';
import { SettingOptionComponent } from 'src/app/shared/components/setting-option/setting-option.component';
import { SwitchBtnComponent } from "../../shared/components/switch-btn/switch-btn.component";
import { EasterEggComponent } from "../../shared/components/easter-egg/easter-egg.component";
import { AuthService } from 'src/app/services/api/account/auth.service';
import { CommonModule } from '@angular/common';
import { SettingsService } from 'src/app/services/api/settings/settings.service';

@Component({
  selector: 'pp-settings',
  templateUrl: './settings.component.html',
  standalone: true,
  imports: [SettingOptionComponent, SwitchBtnComponent, EasterEggComponent, CommonModule]
})
export class SettingsComponent {
  testSetting: boolean = false
  isModerator: boolean | undefined;

  private authService = inject(AuthService);
  settingsService = inject(SettingsService);

  ngOnInit() {
    this.isModerator = this.authService.isModerator;
  }
}
