import { Component, OnInit, Directive, Input, Output, EventEmitter, QueryList, ViewChildren, ElementRef, HostListener } from '@angular/core';
import { VitalParameterService } from '../services/vital-parameter.service';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import * as $ from 'jquery';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-table3',
  templateUrl: './table3.component.html',
  styleUrls: ['./table3.component.scss']
})
export class Table3Component implements OnInit {
  vitalParameters : any[];
  vitalParameterData : any[];
  HRRange= [30,40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200];
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
  mobile: boolean = false;
  collapsed2: any;
  editableIndex : any = null;
  //pagination vars
  page=1;
  pageSize=5

  //alert vars
  private _success = new Subject<string>();
  successMessage: string;

  //vars modal adding
  modalValues : any = [];

  //datefinding
  loggedDates : any = [];
  selectedDate : any= null;

  constructor(public datepipe: DatePipe) { 
    //this.makeRanges();   
    this.parameterForm = new FormGroup({});
     this.vitalParameters = ["Tijd","HR","AFR","BD","TMP","Pijn","BWZ"];
     this.vitalParameterData = [{Tijd: this.date1, Hartritme:66, Ademhalingsfrequentie:10, Bloeddruk:100, Temperatuur:37, Pijn:10, Bewustzijn:1, Editable: false},
                               {Tijd: this.date2, Hartritme:77, Ademhalingsfrequentie:15, Bloeddruk:110, Temperatuur:38, Pijn:20, Bewustzijn:1, Editable: false},
                               {Tijd: this.date3, Hartritme:88, Ademhalingsfrequentie:20, Bloeddruk:120, Temperatuur:39, Pijn:30, Bewustzijn:1, Editable: false},
                               {Tijd: this.date4, Hartritme:99, Ademhalingsfrequentie:30, Bloeddruk:130, Temperatuur:40, Pijn:40, Bewustzijn:1, Editable: true}]; 
    this.clearModalArray();   
    this.readDates();                      
  }

  ngOnInit(): void {
    if (window.screen.width === 360) { // 768px portrait
      this.mobile = true;
      console.log(this.mobile);
    }
    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(2000)
    ).subscribe(() => this.successMessage = null);

    this.InitResponsiveTable();

    //horiscroll
    
  }

  readDates(){
    for(let val of this.vitalParameterData){
      this.loggedDates.unshift(this.datepipe.transform(val.Tijd, 'dd/MM/yyyy'));
    }

    console.log(this.loggedDates)
  }
  
  filterDate(){
    let chosenDate = this.vitalParameterData.find(x=>x.Tijd == this.selectedDate);
    console.log(chosenDate);
  }

  clearModalArray(){
    for (let i = 0; i < this.vitalParameters.length; i++) {
      this.modalValues[i] = 0;
    }
  }

  addRow(){
    console.log(this.newRow);
    let myDate = new Date();
    this.vitalParameterData.unshift({Tijd: myDate, Hartritme: this.newRow.Hartritme, Ademhalingsfrequentie: this.newRow.Ademhalingsfrequentie, Bloeddruk: this.newRow.Bloeddruk, Temperatuur:this.newRow.Temperatuur, Pijn:this.newRow.Pijn, Bewustzijn:this.newRow.Bewustzijn, Editable: true})
    let cloned = this.vitalParameterData.slice();
    this.vitalParameterData = cloned;
    this.newRow = {};
    this.successMessage = "Record succesvol toegevoegd"
    this._success.next(this.successMessage);
    this.selectedRow = null;
    this.editableIndex = null;
    this.InitResponsiveTable();
  }

  editRow(i:any){
    if(this.editableIndex == i){
      this.editableIndex = null;
    }else{
      this.editableIndex = i;
    }  
    console.log(this.editableIndex); 
  }

  //modal values
  addValue(val,vpd,index,event){
    var element = document.getElementById(vpd+val);
    element.classList.toggle("active");

    if(this.modalValues[index] == null){
      this.modalValues.splice(index,0,val);
      event.preventDefault();
      event.isActive= true;
    }else{
      this.modalValues.splice(index,1,val);
    }
    console.log(this.modalValues);
  }

  submitModal(){
    let myDate = new Date();
    this.vitalParameterData.unshift({Tijd: myDate, 
      Hartritme: this.modalValues[1], 
      Ademhalingsfrequentie: this.modalValues[2], 
      Bloeddruk: this.modalValues[3], 
      Temperatuur:this.modalValues[4], 
      Pijn:this.modalValues[5], 
      Bewustzijn:this.modalValues[6]});

    let cloned = this.vitalParameterData.slice();
    this.vitalParameterData = cloned;
    this.selectedRow = null;
    this.editableIndex = null;
    this.InitResponsiveTable();
    this.closeModal();
  }

  closeModal(){
    this.modalValues = [];
    $(".scrollValue").removeClass("active");
    this.clearModalArray();
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
      this.successMessage = "Record succesvol verwijderd"
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
    this.successMessage = "Record succesvol opgeslagen"
    this._success.next(this.successMessage);
  }

  InitResponsiveTable(){
    $(function() {
      $(".table-wrap").each(function() {
        var nmtTable = $(this);
        var nmtHeadRow = nmtTable.find("thead tr");
        nmtTable.find("tbody tr").each(function() {
          var curRow = $(this);
          for (var i = 0; i <= curRow.find("td").length; i++) {
            var rowSelector = "td:eq(" + (i-1) + ")";
            var headSelector = "th:eq(" + i + ")";
            curRow.find(rowSelector).attr('data-title', nmtHeadRow.find(headSelector).text());
          }
        });
      });
    });
  }

  saveCell() {
    console.log("blur werkt")
  }
  
}
