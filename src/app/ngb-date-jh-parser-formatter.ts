import { Injectable } from "@angular/core";
import { NgbDateParserFormatter, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { padNumber, isNumber, isInteger, toInteger } from './helpers';
@Injectable()
export class NgbDateJHParserFormatter extends NgbDateParserFormatter {
	parse(value: string): NgbDateStruct
	{
		if (value) {
		  const dateParts = value.trim().split('/');
		  if (dateParts.length === 1 && isNumber(dateParts[0])) {
		    return {year: toInteger(dateParts[0]), month: null, day: null};
		  } else if (dateParts.length === 2 && isNumber(dateParts[0]) && isNumber(dateParts[1])) {
		    return {year: toInteger(dateParts[0]), month: toInteger(dateParts[1]), day: null};
		  } else if (dateParts.length === 3 && isNumber(dateParts[0]) && isNumber(dateParts[1]) && isNumber(dateParts[2])) {
		    return {year: toInteger(dateParts[0]), month: toInteger(dateParts[1]), day: toInteger(dateParts[2])};
		  }
		}
		return null;
	}

	format(date: NgbDateStruct): string
	{
		return date ? `${padNumber(date.month)}/${padNumber(date.day)}/${date.year.toString().substr(2, 3)}` : '';
	}
}