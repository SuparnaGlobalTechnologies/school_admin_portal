import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'SuparnaFarms Admin';
  constructor() {
    const serverURL = 'http://ec2-54-90-4-87.compute-1.amazonaws.com:8080/api/';
    localStorage.setItem('ServerUrl', serverURL);
  }
  ngOnInit(): void {}

}
