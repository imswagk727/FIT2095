import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: "root",
})
export class DatabaseService {
  constructor(private http: HttpClient) { }
  result: any;
  getActors() {
    return this.http.get("/actors");
  }
  getActor(id: string) {
    let url = "/actors/" + id;
    return this.http.get(url);
  }
  createActor(data: any) {
    return this.http.post("/actors", data, httpOptions);
  }
  updateActor(id: any, data: any) {
    let url = "/actors/" + id;
    return this.http.put(url, data, httpOptions);
  }
  deleteActor(id: any) {
    let url = "/actors/" + id;
    return this.http.delete(url, httpOptions);
  }


  getMoive(id: string) {
    let url = "/movies/" + id;
    return this.http.get(url);
  }

  getMovies() {
    return this.http.get("/movies");
  }

  //1.
  createMovie(data: any) {
    return this.http.post("/movie", data, httpOptions);
  }


  //2.
  deleteMovieByTitle(title: string) {
    let pathName = '/movies/del' + title;
    return this.http.delete(pathName);
  }

  saveItem(itemDetails: object) {
    let pathName = "/items"
    return this.http.post(pathName, itemDetails,httpOptions);
  }


}