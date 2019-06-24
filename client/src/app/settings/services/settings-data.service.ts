import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SettingsState } from '@app/settings';
import { environment as env } from '@env/environment';

@Injectable()
export class SettingsDataService {
  constructor(private readonly http: HttpClient) {}

  getAllSettings(): Observable<SettingsState> {
    return this.http.get<SettingsState>(`${env.apiUrl}/user/settings`);
  }

  updateAllSettings(settings: SettingsState): Observable<unknown> {
    return this.http.post(`${env.apiUrl}/user/settings`, settings);
  }
}
