import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

// if u dont set root, cant read whole app
@Injectable({
  providedIn: "root",
})
export class DatabaseService {
  constructor(private http: HttpClient) { }

  // create result var
  result: any;

  getActors() {
    return this.http.get("/actors");
  }

  // give id a parameter
  getActor(id: string) {
    let url = "/actors/" + id;
    return this.http.get(url);
  }

  createActor(data:any) {
    return this.http.post("/actors", data, httpOptions);
  }

  updateActor(id:any, data:any) {
    let url = "/actors/" + id;
    return this.http.put(url, data, httpOptions);
  }

  deleteActor(id:any) {
    let url = "/actors/" + id;
    return this.http.delete(url, httpOptions);
  }


  /////////////////////////////// for movies /////////////////////////////
  getMovies() {
    return this.http.get("/movies");
  }

  // give id a parameter
  getMovie(id: string) {
    let url = "/movies/" + id;
    return this.http.get(url);
  }

  createMovie(data:any) {
    return this.http.post("/movies", data, httpOptions);
  }

  deleteMovie(id:any) {
    let url = "/movies/" + id;
    return this.http.delete(url, httpOptions);
  }

  deleteMovieByYear() {
    let url = "/movies";
    return this.http.delete(url, httpOptions);
  }

  addActor(movieid:any, data:any) {
    let url = "/movies/" + movieid;
    return this.http.post(url, data, httpOptions);
  }

}