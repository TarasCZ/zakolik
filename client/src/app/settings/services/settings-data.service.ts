import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {SettingsState} from '@app/settings';

const LOCAL_API_URL = 'http://localhost:4000'; // TODO: MAKE ENVIROMENTAL VARIABLE

@Injectable()
export class SettingsDataService {
  constructor(private readonly http: HttpClient) {
  }

  getAllSettings(): Observable<SettingsState> {
    return this.http.get<SettingsState>(`${LOCAL_API_URL}/user/settings`)
  }

  updateAllSettings(settings: SettingsState): Observable<unknown> {
    return this.http.post(`${LOCAL_API_URL}/user/settings`, settings)
  }
}
