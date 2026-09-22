import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Youtube {

  private apiUrl = 'https://www.googleapis.com/youtube/v3/search';

  constructor(private http: HttpClient) {}

  buscarVideos(texto: string): Observable<any> {
    const params = new HttpParams()
      .set('part', 'snippet')
      .set('q', texto)
      .set('type', 'video')
      .set('maxResults', '10')
      .set('key', 'AIzaSyC4Rtx0dUPdNeaqAHK2RjHy2PXzBCMimcg');

    return this.http.get<any>(this.apiUrl, { params });
  }
}