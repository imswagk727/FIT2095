import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { DatabaseService } from "./database.service";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { ListactorsComponent } from "./listactors/listactors.component";
import { AddactorComponent } from "./addactor/addactor.component";
import { DeleteactorComponent } from "./deleteactor/deleteactor.component";
import { UpdateactorComponent } from "./updateactor/updateactor.component";
import { RouterModule, Routes } from "@angular/router";

import { ListmoviesComponent } from "./listmovies/listmovies.component";
import { AddmovieComponent } from "./addmovie/addmovie.component";
import { DeletemovieComponent } from "./deletemovie/deletemovie.component";
import { UpdatemovieComponent } from "./updatemovie/updatemovie.component";
import { ViewNotFoundComponent } from './view-not-found/view-not-found.component';
import { W10labPipe } from './w10lab.pipe';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


const appRoutes: Routes = [
  { path: "listactors", component: ListactorsComponent },
  { path: "addactor", component: AddactorComponent },
  { path: "updateactor", component: UpdateactorComponent },
  { path: "deleteactor", component: DeleteactorComponent },

  { path: "listmovies", component: ListmoviesComponent },
  { path: "addmovie", component: AddmovieComponent },
  { path: "updatemovie", component: UpdatemovieComponent },
  { path: "deletemovie", component: DeletemovieComponent },

  { path: "", redirectTo: "/listactors", pathMatch: "full" },
  { path: '**', component: ViewNotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    ListactorsComponent,
    AddactorComponent,
    UpdateactorComponent,
    DeleteactorComponent,
    ListmoviesComponent,
    AddmovieComponent,
    UpdatemovieComponent,
    DeletemovieComponent,
    ViewNotFoundComponent,
    W10labPipe,
  ],
  imports: [
    RouterModule.forRoot(appRoutes, {useHash: true}), // hash - to separate local host and device (backend frontend), act as an separator
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [DatabaseService],
  bootstrap: [AppComponent],
})
export class AppModule {}

