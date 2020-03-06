import { Component, OnInit } from '@angular/core';
import { VitalParameterService } from '../services/vital-parameter.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  vitalParameters : any[];
  vitalParameterData : any[];
  HRRange= [80,90,100,110,120,130,140,150,160];
  AFRange= [5,10,15,20,25];
  BDRange= ["<60",70, 80,90,100,110,120,130,140,150,160,170,">180"];
  TempRange = ["<36",36,37,38,39,40,41, ">40"];
  PijnRange= [1,2,3,4,5,6,7,8,9,10];
  BewustzijnRange= [1,2,3,4,5,6,7,8,9,10];
  runOnce : boolean = false;
  addForm: FormGroup;
  parameterForm: FormGroup;
  newRow : any = {};
  date1: Date = new Date("March 3, 2020 10:13:00");
  date2: Date = new Date("March 4, 2020 12:15:00");
  date3: Date = new Date("March 5, 2020 9:30:00");
  date4: Date = new Date("March 5, 2020 11:45:00");

  constructor(private service: VitalParameterService) { 
    //this.makeRanges();
    this.parameterForm = new FormGroup({});
     this.vitalParameters = ["Tijd","Hartritme","Ademhalingsfrequentie","Bloeddruk (bovendruk)","Temperatuur","Pijn","Bewustzijn"];
     this.vitalParameterData = [{Tijd: this.date1, Hartritme:66, Ademhalingsfrequentie:10, Bloeddruk:100, Temperatuur:37, Pijn:10, Bewustzijn:1},
                               {Tijd: this.date2, Hartritme:77, Ademhalingsfrequentie:15, Bloeddruk:110, Temperatuur:38, Pijn:20, Bewustzijn:1},
                               {Tijd: this.date3, Hartritme:88, Ademhalingsfrequentie:20, Bloeddruk:120, Temperatuur:39, Pijn:30, Bewustzijn:1},
                               {Tijd: this.date4, Hartritme:99, Ademhalingsfrequentie:30, Bloeddruk:130, Temperatuur:40, Pijn:40, Bewustzijn:1}];                             
  }

  addRow(){
    console.log(this.newRow);
    let myDate = new Date();
    this.vitalParameterData.push({Tijd: myDate, Hartritme: this.newRow.Hartritme, Ademhalingsfrequentie: this.newRow.Ademhalingsfrequentie, Bloeddruk: this.newRow.Bloeddruk, Temperatuur:this.newRow.Temperatuur, Pijn:this.newRow.Pijn, Bewustzijn:this.newRow.Bewustzijn})
    this.newRow = {};
  }

  submitRow(){
    console.log(this.parameterForm.value);
  }

  removeRow(index: any){
    this.vitalParameterData.splice(index,1);
  }

  ngOnInit(): void {
    
  }

  
  saveCell(){
    console.log("blur werkt")
    this.newRow.push()

  }

  
}
