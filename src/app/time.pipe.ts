import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(date: string):string {
    let dateJS = new Date(date);
    let dateJScurrent = new Date();
    if(dateJS.getFullYear() < dateJScurrent.getFullYear()){
      return (dateJScurrent.getFullYear() - dateJS.getFullYear()).toString() + "yr";
    } else if(dateJS.getMonth() < dateJScurrent.getMonth()){
      return( dateJScurrent.getMonth() - dateJS.getMonth()).toString() + "mo";
    } else if(dateJS.getDate() < dateJScurrent.getDate()){
      return(dateJScurrent.getDate() - dateJS.getDate()).toString() + "d";
    } else if(dateJS.getHours() < dateJScurrent.getHours()){
      return(dateJScurrent.getHours() - dateJS.getHours()).toString() + "d";
    } else if(dateJS.getMinutes() < dateJScurrent.getMinutes()){
      return(dateJScurrent.getMinutes() - dateJS.getMinutes()).toString() + "min";
    } else {
      return "now";
    }
  }
}
