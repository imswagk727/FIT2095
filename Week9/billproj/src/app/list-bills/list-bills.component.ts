import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-list-bills',
  templateUrl: './list-bills.component.html',
  styleUrls: ['./list-bills.component.css']
  
})
export class ListBillsComponent implements OnInit {

  constructor(private dbService:DatabaseService) { }

  ngOnInit(): void {
    
    this.dbService.getBills().subscribe((data:any) =>{
      this.db=data;
    });

  }

  db:any[]=[];



}

