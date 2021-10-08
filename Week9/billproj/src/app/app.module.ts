import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AddBillComponent } from './add-bill/add-bill.component';
import { ListBillsComponent } from './list-bills/list-bills.component';
import { DelBillComponent } from './del-bill/del-bill.component';
import { DatabaseService } from './database.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

const routingTable:Routes=[
  {path:'listbills',component:ListBillsComponent},
  {path:'addbill',component:AddBillComponent},
  {path:'deletebill',component:DelBillComponent},
  {path:"**",redirectTo:'/listbills',pathMatch:'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    AddBillComponent,
    ListBillsComponent,
    DelBillComponent
  ],
  imports: [
    RouterModule.forRoot(routingTable,{useHash:true}),
    BrowserModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [DatabaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
