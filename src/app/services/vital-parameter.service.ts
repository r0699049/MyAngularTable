import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VitalParameterService {
  vitalParameters : any[];
  vitalParameterData : any[];
  HRRange:any[]= [];
  AFRange:any[]= [];
  BDRange:any[]= [];
  TempRange:any[] = [];
  PijnRange:any[]= [];
  BewustzijnRange:any[]= [];


  constructor() { 
  }

  makeRanges(){
    
      for(var _i=0; _i<=200; _i+10){
        this.HRRange.push(_i);
      }
      for(var i=0; i<=20; i+5){
        this.AFRange.push(i);
      }
      for(var i=0; i<=225; i+10){
        this.BDRange.push(i);
      }
      for(var i=37; i<=42; i+1){
        this.TempRange.push(i);
      }
      for(var i=0; i<=10; i+1){
        this.PijnRange.push(i);
      }
      for(var i=0; i<=4; i+1){
        this.BewustzijnRange.push(i);
      }
    
    
  }
}
