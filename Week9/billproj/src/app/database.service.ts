import {
  Injectable
} from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http: HttpClient) {}


  getBills() {
    let pathName = "/bills";
    return this.http.get(pathName);

  }
  createBill(aBill: object) {
    let pathName = "/bills";
    return this.http.post(pathName, aBill, httpOptions);
  }
  DeleteBill() {


  }
}
