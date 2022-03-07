import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { StudentModel } from './student-dashboard.model';
@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {

  formValue !: FormGroup;
  studentModelObj: StudentModel = new StudentModel();
  studentData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;


  constructor(private formbuilder: FormBuilder,
    private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      name: [''],
      branch: [''],
      university: [''],
      mobileno: ['']
    })
    this.getAllStudent();

  }
  clickAddStudent() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  postStudentDetails() {
    this.studentModelObj.name = this.formValue.value.name;
    this.studentModelObj.branch = this.formValue.value.branch;
    this.studentModelObj.university = this.formValue.value.university;
    this.studentModelObj.mobileno = this.formValue.value.mobileno;

    this.api.postStudent(this.studentModelObj)
      .subscribe(res => {
        console.log(res);
        alert("Student Added Successfully")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllStudent(); //for appending into list after adding student

      })
  }
  //display all student details that is updated
  getAllStudent() {
    this.api.getStudent()
      .subscribe(res => {
        this.studentData = res;
      })
  }
  deleteStudent(row: any) {
    this.api.deleteStudent(row.id)
      .subscribe(res => {

        alert("Student Deleted");
        this.getAllStudent();
      })
  }
  onEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.studentModelObj.id = row.id;
    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['branch'].setValue(row.branch);
    this.formValue.controls['university'].setValue(row.university);
    this.formValue.controls['mobileno'].setValue(row.mobileno);
  }
  updateStudentDetails() {
    this.studentModelObj.name = this.formValue.value.name;
    this.studentModelObj.branch = this.formValue.value.branch;
    this.studentModelObj.university = this.formValue.value.university;
    this.studentModelObj.mobileno = this.formValue.value.mobileno;

    this.api.updateStudent(this.studentModelObj, this.studentModelObj.id)
      .subscribe(res => {
        alert("Updated Successfully");
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllStudent();
      })
  }
}
