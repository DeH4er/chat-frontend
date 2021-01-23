import { Injectable, NgZone } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class SseService {
  constructor(private zone: NgZone) {}

  get<T>(url: string): Observable<T> {
    return new Observable((obs: Observer<T>) => {
      const eventSource = new EventSource(`${API_URL}/${url}`);

      eventSource.onmessage = (e: MessageEvent<string>) => {
        this.zone.run(() => {
          obs.next(JSON.parse(e.data));
        });
      };

      eventSource.onerror = (error: any) => {
        this.zone.run(() => {
          obs.error(error);
        });
      };

      return () => {
        eventSource.close();
      };
    });
  }
}
