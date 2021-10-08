import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "../database.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-view-not-found',
  templateUrl: './view-not-found.component.html',
  styleUrls: ['./view-not-found.component.css']
})
export class ViewNotFoundComponent implements OnInit {

  constructor(private dbService: DatabaseService, private router: Router) {}

  ngOnInit(): void {
    console.log("Hi From view not found");
  }

}
