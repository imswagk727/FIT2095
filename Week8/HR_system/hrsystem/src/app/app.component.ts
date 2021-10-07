import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HR System';
  fullName = '';
  email = '';
  unit = '';
  hrDB: any = [];
  toggleTitle = "Student"
  fees = 0;
  school = '';
  isTeacher: boolean = true;
  //SaveTeacher will get exectued when the user hits the save teacher button line23@app.component.html 
  saveTeacher() {
    this.hrDB.push({
      id: this.getNewId(),
      fullName: this.fullName,
      email: this.email,
      unit: this.unit,
      type: 'Teacher'
    });
    //reset the input feilds
    this.fullName = '';
    this.email = '';
    this.unit = '';
  }
  //SaveTeacher will get exectued when the user hits the save student button line56@app.component.html  
  saveStudent() {
    this.hrDB.push({
      id: this.getNewId(),
      fullName: this.fullName,
      fees: this.fees,
      school: this.school,
      type: 'Student'
    });
    this.fullName = '';
    this.fees = 0;
    this.school = '';
  }
  // This button will get executed with the user clicks the toggle button line5@app.component.html 
  changeState() {
    if (this.isTeacher) {
      this.toggleTitle = "Teacher";
    } else {
      this.toggleTitle = "Student";
    }
    this.isTeacher = !this.isTeacher;
  }
  getNewId() {
    return Math.floor(Math.random() * 10000);
  }
}
