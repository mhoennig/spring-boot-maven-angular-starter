import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular via SpringBoot';
  response = '[No response from SpringBoot backend yet.]';

  constructor(private httpClient: HttpClient) {
    this.ident()
    .subscribe(
      data => {
        this.response = data['ping'];
      },
      error => {
        this.response = error.message;
    });
  }

  // just for this minimalistic example, such code would normally be in a service
  ident(): Observable<any> {
    return this.httpClient.get('/api/ping', {responseType: 'json'});
  }
}
