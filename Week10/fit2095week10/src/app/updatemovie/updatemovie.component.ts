import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "../database.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-updatemovie',
  templateUrl: './updatemovie.component.html',
  styleUrls: ['./updatemovie.component.css']
})
export class UpdatemovieComponent implements OnInit {
  title: string = "";
  year: number = 0;
  movieId: string = "";

  moviesDB: any[] = [];

  
  fullName: string = "";
  bYear: number = 0;
  actorId: string = "";
  actorsDB: any[] = [];


  constructor(private dbService: DatabaseService, private router: Router) {}

  onGetActors() { 
    this.dbService.getActors().subscribe((data: any) => {
    this.actorsDB = data; 
    });
  }

  //Get all Movies
  onGetMovies() {
    console.log("From on Get Movies");

    return this.dbService.getMovies().subscribe((data: any) => {
      this.moviesDB = data;
    });
  }

  // Update an Actor
  onSelectUpdate(item) {
    this.fullName = item.name;
    this.bYear = item.bYear;
    this.actorId = item._id;
  }


  onUpdateMovie() {
    let obj = { title: this.title, year: this.year };
    this.dbService.addActor(this.movieId, obj).subscribe(result => {
      this.onGetMovies();
      this.router.navigate(["/listmovies"]);
    });
  }


  ngOnInit() {
    this.onGetMovies();
    this.onGetActors(); 
  }

  onSelectMovie(item) { 
    this.year = item.year;
    this.movieId = item._id;
    this.title = item.title; 
    }

  onAddActor(){
    let obj = { 
      actorid: this.actorId,
    }; 

      this.dbService.addActor(this.movieId, obj).subscribe(result => {
        this.onGetMovies(); 
        this.onGetActors(); 
        this.router.navigate(["/listmovies"]);
      })  

    }

}