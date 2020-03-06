import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Options } from 'ng5-slider';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

interface SimpleSliderModel {
  value: number;
  options: Options;
}

@Component({
  selector: 'app-table2',
  templateUrl: './table2.component.html',
  styleUrls: ['./table2.component.scss']
})
export class Table2Component implements OnInit {
//alert vars
private _success = new Subject<string>();
successMessage: string;
  addForm: FormGroup;
  parameterForm: FormGroup;
  rows: FormArray;
  HRRange= [80,90,100,110,120,130,140,150,160];
  AFRange= [5,10,15,20,25];
  BDRange= ["<60",70, 80,90,100,110,120,130,140,150,160,170,">180"];
  TempRange = ["<36",36,37,38,39,40,41, ">40"];
  PijnRange= [1,2,3,4,5,6,7,8,9,10];
  BewustzijnRange= [1,2,3,4,5,6,7,8,9,10];
  vitalParameters = ["Hartritme","Ademhalingsfrequentie","Bloeddruk","Temperatuur","Pijn","Bewustzijn", "Action"];
  vitalParameterData = [{Hartritme:66, Ademhalingsfrequentie:10, Bloeddruk:100, Temperatuur:37, Pijn:10, Bewustzijn:1},
                        {Hartritme:77, Ademhalingsfrequentie:15, Bloeddruk:110, Temperatuur:38, Pijn:20, Bewustzijn:1},
                        {Hartritme:88, Ademhalingsfrequentie:20, Bloeddruk:120, Temperatuur:39, Pijn:30, Bewustzijn:1},
                        {Hartritme:99, Ademhalingsfrequentie:30, Bloeddruk:130, Temperatuur:40, Pijn:40, Bewustzijn:1}];


  constructor(private fb: FormBuilder) {
    this.addForm = this.fb.group({
      items: [null, Validators.required]
    });
    this.parameterForm = new FormGroup({});
    this.rows = this.fb.array([]);
  }

  ngOnInit() {
    this.addForm.addControl('rows', this.rows); 
  }

  onAddRow() {
    this.rows.push(this.createItemFormGroup());
  }

  onRemoveRow(rowIndex:number){
    this.rows.removeAt(rowIndex);
  }

  addRow(row: any, index:number){
    console.log(row.value);
    console.log(index);
  }

  createItemFormGroup(): FormGroup {
    const itemGroup: FormGroup = new FormGroup({});
    for(const value in this.vitalParameters){
      const control: FormControl = new FormControl(this.vitalParameters[value], Validators.required);
      itemGroup.addControl(control.value,control);
    }
    return itemGroup;
  }

  slidersettings = [
    {
      value : 40,
      options : {
      floor: 40,
      ceil: 200,
      step: 10,
      showTicks: true,
      showSelectionBar: true,
      getPointerColor: (value: number): string => {
          if (value <= 40 || value >= 180) {
            return 'red';
          }
          else {
            return '#2AE02A';
          }
        },
      getSelectionBarColor: (value: number): string => {
        if (value <= 40 || value >= 180) {
          return 'red';
        }
        else {
          return 'green';
        }
       }       
      }
    },
    {
      value : 0,
      options : {
      floor: 5,
      ceil: 30,
      step: 5,
      showTicks: true,
      showTicksValues: true,
      showSelectionBar: true,
      getPointerColor: (value: number): string => {
          if (value <= 10 || value >= 25) {
            return 'red';
          }
          else {
            return '#2AE02A';
          }
        },
      getSelectionBarColor: (value: number): string => {
        if (value <= 10 || value >= 25) {
          return 'red';
        }
        else {
          return 'green';
        }
       }       
      }
    },
    {
      value : 0,
      options : {
      floor: 60,
      ceil: 180,
      step: 10,
      showTicks: true,
      showTicksValues: true,
      showSelectionBar: true,
      getPointerColor: (value: number): string => {
        if (value <= 80) {
          return 'red';
        }
        if(value >= 160){
          return 'red';
        }
        if(value <= 90){
          return 'orange';
        }
        if(value >= 150){
          return 'orange';
        }
        else {
          return 'green';
        }
        },
      getSelectionBarColor: (value: number): string => {
        if (value <= 80) {
          return 'red';
        }
        if(value >= 160){
          return 'red';
        }
        if(value <= 90){
          return 'orange';
        }
        if(value >= 150){
          return 'orange';
        }
        else {
          return 'green';
        }
       }       
      }
    },
    {
      value : 31,
      options : {
      floor: 31,
      ceil: 42,
      step: 1,
      showTicks: true,
      showTicksValues: true,
      showSelectionBar: true,
      getPointerColor: (value: number): string => {
        if (value <= 33) {
          return 'red';
        }
        if(value == 34){
          return 'orange';
        }
        if(value == 38){
          return 'orange';
        }
        if(value >= 39){
          return 'red';
        }
        else {
          return 'green';
        }
        },
      getSelectionBarColor: (value: number): string => {
        if (value <= 33) {
          return 'red';
        }
        if(value == 34){
          return 'orange';
        }
        if(value == 38){
          return 'orange';
        }
        if(value >= 39){
          return 'red';
        }
        else {
          return 'green';
        }
       }       
      }
    },
    {
      value : 0,
      options : {
      floor: 0,
      ceil: 100,
      step: 10,
      showTicks: true,
      showTicksValues: true,
      showSelectionBar: true,
      getPointerColor: (value: number): string => {
        if (value <= 40) {
          return 'green';
        }
        if(value <= 70){
          return 'orange';
        }
        else {
          return 'red';
        }
        },
      getSelectionBarColor: (value: number): string => {
        if (value <= 40) {
          return 'green';
        }
        if(value <= 70){
          return 'orange';
        }
        else {
          return 'red';
        }
       }       
      }
    },
    {
      value : 0,
      options : {
      floor: 0,
      ceil: 100,
      step: 10,
      showTicks: true,
      showTicksValues: true,
      showSelectionBar: true,
      getPointerColor: (value: number): string => {
        if (value <= 40) {
          return 'red';
        }
        if(value <= 70){
          return 'orange';
        }
        else {
          return 'green';
        }
        },
      getSelectionBarColor: (value: number): string => {
        if (value <= 40) {
          return 'red';
        }
        if(value <= 70){
          return 'orange';
        }
        else {
          return 'green';
        }
       }       
      }
    } 
  ];

  

}
