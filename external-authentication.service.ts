import { Injectable } from '@angular/core';
import { Authenticate } from '../models/authenticate.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '@labdat/common/environments';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ExternalAuthenticationService {
  settings: Map<string, SettingsProperty>;

  constructor(private _http: HttpClient,
    private _eh: ErrorHandleService,
    private _ac: ConfigService) {
    this.settings = new Map<string, SettingsProperty>();
  }

  fetchSettings() {
    this._http.get('/api/settings/v1/')
      .map((response: any) => <Array<SettingsProperty>>response)
      .catch((err: HttpErrorResponse) => {
        this._eh.handleError(err);
        return Observable.throw('Server error');
      })
      .subscribe((settings: Array<SettingsProperty>) => {
        settings.forEach((setting: SettingsProperty) => {
          this.settings.set(setting.key, new SettingsProperty(
            setting.key, setting.type, setting.value, setting.edit
          ));
        });

        if (this.settings.has(SettingAuthGoogleClientID)) {
          let options: IOauth2Options = <IOauth2Options>this._ac.options.providers['google'];
          options.clientId = this.settings.get(SettingAuthGoogleClientID).asString();
        }
        if (this.settings.has(SettingAuthFacebookClientID)) {
          let options: IOauth2Options = <IOauth2Options>this._ac.options.providers['facebook'];
          options.clientId = this.settings.get(SettingAuthFacebookClientID).asString();
        }
        if (this.settings.has(SettingAuthGithubClientID)) {
          let options: IOauth2Options = this._ac.options.providers['github'] as IOauth2Options;
          options.clientId = this.settings.get(SettingAuthGithubClientID).asString();
        }
      });
  }

  hasProvider(provider: string): boolean {
    switch (provider) {
      case 'google':
        if (this.settings.has(SettingAuthGoogleClientID)) {
          return this.settings.get(SettingAuthGoogleClientID).asString() !== '';
        }
        break;
      case 'facebook':
        if (this.settings.has(SettingAuthFacebookClientID)) {
          return this.settings.get(SettingAuthFacebookClientID).asString() !== '';
        }
        break;
      case 'github': {
        if (this.settings.has(SettingAuthGithubClientID)) {
          return this.settings.get(SettingAuthGithubClientID).asString() !== '';
        }
        break;
      }
      case 'twitter': {
        if (this.settings.has(SettingTwitterEnabled)) {
          return this.settings.get(SettingTwitterEnabled).asBool();
        }
        break;
      }
      default: return false;
    }

    return false;
  }
}
