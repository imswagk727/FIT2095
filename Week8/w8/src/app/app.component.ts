import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data: any = [];
  item = "";
  newItem() {
    this.data.push(this.item);
  }
  clearItems() {
    this.data = [];
  }
}
