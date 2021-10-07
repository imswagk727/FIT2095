import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  fName: string = "";
  lName: string = "";
  dob: string = "";
  suburb: string = "";
  state: string = "";
  // state: Array<string> = ["ACT", "NSW", "NT", "QLD", "SA", "TAS", "WA", "VIC"];
  newState: string = "";
  postcode: string = "";
  noPatient: number = 0;
  deleteN: number = 0;
  doctorAr: Array<any> = []

  saveDoctor(): void {
    this.doctorAr.push({
      fName: this.fName,
      lName: this.lName,
      dob: this.dob,
      address: this.suburb + ',' + this.state + ',' + this.postcode,
      noPatient: this.noPatient,
    });
  }

  deleteDcotorsWithNoPatient(): void {
    this.doctorAr = this.doctorAr.filter(function (element): boolean {
      return element.noPatient != 0;
    });
  }


  NoPatientNum(): number {
    return this.doctorAr.filter(function (element): boolean {
      return element.noPatient == 0;
    }).length;
  }

  deleteItem(index: number) {
    this.doctorAr.splice(index, 1);
  }

  incPatient(index: number) {
    this.doctorAr[index].noPatient++;
  }

}
