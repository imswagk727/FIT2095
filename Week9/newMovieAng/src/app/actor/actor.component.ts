import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "../database.service";
@Component({
  selector: "app-actor",
  templateUrl: "./actor.component.html",
  styleUrls: ["./actor.component.css"],
})
export class ActorComponent implements OnInit {
  section = 1;

  actorsDB: any[] = [];
  fullName: string = "";
  bYear: number = 0;
  actorId: string = "";
  movieTitleDelete: string = "";

  movieDB: any[] = [];
  movieTitle: string = "";
  movieYear: number = 0;
  constructor(private dbService: DatabaseService) { }
  //Get all Actors
  onGetActors() {
    this.dbService.getActors().subscribe((data: any) => {
      this.actorsDB = data;
    });
  }
  //Create a new Actor, POST request
  onSaveActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.createActor(obj).subscribe(result => {
      this.onGetActors();
    });
  }
  // Update an Actor
  onSelectUpdate(item: any) {
    this.fullName = item.name;
    this.bYear = item.bYear;
    this.actorId = item._id;
  }
  onUpdateActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.updateActor(this.actorId, obj).subscribe(result => {
      this.onGetActors();
    });
  }
  //Delete Actor
  onDeleteActor(item: any) {
    this.dbService.deleteActor(item._id).subscribe(result => {
      this.onGetActors();
    });
  }
  // This lifecycle callback function will be invoked with the component get initialized by Angular.
  ngOnInit() {
    this.onGetActors();
    this.onGetMovies();
  }
  changeSection(sectionId: any) {
    this.section = sectionId;
    this.resetValues();
  }
  resetValues() {
    this.fullName = "";
    this.bYear = 0;
    this.actorId = "";
  }

  //Get all Moives
  onGetMovies() {
    this.dbService.getMovies().subscribe((data: any) => {
      this.movieDB = data;
    });
  }
  //Create a new Actor, POST request
  onSaveMovie() {
    let obj = { title: this.movieTitle, year: this.movieYear };
    this.dbService.createMovie(obj).subscribe(result => {
      this.onGetMovies();
    });
  }


  //2.
  onDeleteMovieByTitle() {
    this.dbService.deleteMovieByTitle(this.movieTitleDelete).subscribe((result: any) => {
      console.log(result);
    })
  }

  onSaveItem() {
    let newItem = {
      name: this.fullName,
      bYear: this.bYear
    }
    this.dbService.saveItem(newItem).subscribe((data: any) => { })
  }
}