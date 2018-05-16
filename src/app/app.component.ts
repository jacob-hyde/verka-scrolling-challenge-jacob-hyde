import { Component, ViewChild, ElementRef, HostListener, OnInit } from '@angular/core';
import { NgbDateParserFormatter, NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateJHParserFormatter } from './ngb-date-jh-parser-formatter';
import { TimespanModel } from './timespanModel';
import { InfinityScrollingComponent } from './infinity-scrolling/infinity-scrolling.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [{provide: NgbDateParserFormatter, useClass: NgbDateJHParserFormatter}]
})
export class AppComponent implements OnInit
{
	public timeSpanModel: TimespanModel;
	private _datepickerID;

//----------------------------------------------------------------------------------------------------------------------

	@HostListener('document:click', ['$event']) clickedOutside($event){
		if(this._datepickerID && !this._eref.nativeElement.contains(event.target))
		{
			let self = this;
			setTimeout(function(){
				self._datepickerID.close();
				self._datepickerID = null;   
			},10);
		}
	}

//----------------------------------------------------------------------------------------------------------------------

	constructor(private _eref: ElementRef)
	{

		this.timeSpanModel = new TimespanModel(new Date(1500348260 * 1000), new Date(1503031520 * 1000));
	}

//----------------------------------------------------------------------------------------------------------------------

	public ngOnInit()
	{
	}

//----------------------------------------------------------------------------------------------------------------------
	
	public openDatepicker(id)
	{
		if(this._datepickerID) this._datepickerID.close();
		this._datepickerID = id;
	}

//---------------------------------------------------------------------------------------------------------------------

	public dateSelected($event)
	{
		//TODO
	}

}