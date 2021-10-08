import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-add-bill',
  templateUrl: './add-bill.component.html',
  styleUrls: ['./add-bill.component.css']
})
export class AddBillComponent implements OnInit {

  constructor(private dbService:DatabaseService, private router:Router) { }

  ngOnInit(): void {
  }

  name:string = '';
  price:number = 0;
  quantity:number = 0;

  onSaveBillButton(){
   let aBill={
     name:this.name,
     price:this.price,
     quantity:this.quantity,
   };
   console.log(aBill);
   this.dbService.createBill(aBill).subscribe((data:any)=>{
     console.log(data);
     this.router.navigate(['/listbills'])

   });
  }

}
