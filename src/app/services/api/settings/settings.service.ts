import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  setModeratorButtonsSetting(setting: boolean){
    localStorage.setItem("moderatorButtonsSetting", setting.toString())
  }

  getModeratorButtonsSetting(){
    let value = localStorage.getItem("moderatorButtonsSetting")
    if (value == null) {
      this.setModeratorButtonsSetting(false)
    }
    return localStorage.getItem("moderatorButtonsSetting") == "true"
  }

  setTestingButtonSetting(setting: boolean){
    localStorage.setItem("TestingButtonSetting", setting.toString())
  }

  getTestingButtonSetting(){
    let value = localStorage.getItem("TestingButtonSetting")
    if (value == null) {
      this.setTestingButtonSetting(false)
    }
    return localStorage.getItem("TestingButtonSetting") == "true"
  }
}
