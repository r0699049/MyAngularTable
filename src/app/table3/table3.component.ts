import { Component, OnInit, Directive, Input, Output, EventEmitter, QueryList, ViewChildren, ElementRef } from '@angular/core';
import { VitalParameterService } from '../services/vital-parameter.service';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-table3',
  templateUrl: './table3.component.html',
  styleUrls: ['./table3.component.scss']
})
export class Table3Component implements OnInit {
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
  existingRow : any = {};
  date1: Date = new Date("March 1, 2020 10:13:00");
  date2: Date = new Date("March 2, 2020 12:15:00");
  date3: Date = new Date("March 3, 2020 9:30:00");
  date4: Date = new Date("March 4, 2020 16:45:00");
  selectedRow : any = null;

  //pagination vars
  page=1;
  pageSize=5

  //alert vars
  private _success = new Subject<string>();
  successMessage: string;

  constructor(private service: VitalParameterService) { 
    //this.makeRanges();
    this.parameterForm = new FormGroup({});
     this.vitalParameters = ["Tijd","Hartritme","Ademhalingsfrequentie","Bloeddruk","Temperatuur","Pijn","Bewustzijn"];
     this.vitalParameterData = [{Tijd: this.date1, Hartritme:66, Ademhalingsfrequentie:10, Bloeddruk:100, Temperatuur:37, Pijn:10, Bewustzijn:1},
                               {Tijd: this.date2, Hartritme:77, Ademhalingsfrequentie:15, Bloeddruk:110, Temperatuur:38, Pijn:20, Bewustzijn:1},
                               {Tijd: this.date3, Hartritme:88, Ademhalingsfrequentie:20, Bloeddruk:120, Temperatuur:39, Pijn:30, Bewustzijn:1},
                               {Tijd: this.date4, Hartritme:99, Ademhalingsfrequentie:30, Bloeddruk:130, Temperatuur:40, Pijn:40, Bewustzijn:1}];                         
  }

  addRow(){
    console.log(this.newRow);
    let myDate = new Date();
    this.vitalParameterData.push({Tijd: myDate, Hartritme: this.newRow.Hartritme, Ademhalingsfrequentie: this.newRow.Ademhalingsfrequentie, Bloeddruk: this.newRow.Bloeddruk, Temperatuur:this.newRow.Temperatuur, Pijn:this.newRow.Pijn, Bewustzijn:this.newRow.Bewustzijn})
    let cloned = this.vitalParameterData.slice();
    this.vitalParameterData = cloned;
    this.newRow = {};
    this.successMessage = "Row added successfully"
    this._success.next(this.successMessage);
  }

  updateRow(){
    console.log(this.existingRow); 
  }

  removeRow(){
    if(this.selectedRow != null){
      if(this.page >1){
        var indexToAdd = null;
        for(var i = 0; i <= this.page; i++){
          indexToAdd = (i-1)*this.pageSize;
        }
        var newIndex = this.selectedRow + indexToAdd;
        this.vitalParameterData.splice(newIndex, 1);
        this.selectedRow = null;

      }else{
        this.vitalParameterData.splice(this.selectedRow,1);
        this.selectedRow = null;
      }  
      this.successMessage = "Row succesfully deleted"
      this._success.next(this.successMessage);
    }
  }

  selectRow(i:number){
    //this.selectedRow = null;
    if(this.selectedRow == i){
      this.selectedRow = null;
    }else{
      this.selectedRow = i;
    }
  }

  //prevent selecting a row when clicking the select 
  reSelectRow(event : any){
    event.stopPropagation();
  }

  saveChanges(){
    this.successMessage = "Changes successfully saved"
    this._success.next(this.successMessage);
    
  }

  ngOnInit(): void {
    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(2000)
    ).subscribe(() => this.successMessage = null);
  }

  saveCell(){
    console.log("blur werkt")
  }
  
}
