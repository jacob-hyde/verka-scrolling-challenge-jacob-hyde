import { Component, OnInit, Input, ViewEncapsulation, ElementRef, Renderer2, ViewChild, HostListener } from '@angular/core';
import { TimespanModel } from './../timespanModel';
import { ThumbnailService } from './../thumbnail.service';
@Component({
  selector: 'app-infinity-scrolling',
  templateUrl: './infinity-scrolling.component.html',
  styleUrls: ['./infinity-scrolling.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InfinityScrollingComponent implements OnInit
{

//----------------------------------------------------------------------------------------------------------------------

	public rows = [];
	public rowTimes = [];
	public contentHeight;
	public pageHeight;
	public yOffset = 0;
	public scrollPosition = 0;
	public firstTime;
	public rowHeight = 260;
	public rowTotal;
	public itemTotal;
	public scrollDivHeight = 0;

	private _from;
	private _to;
	private _timespanHMS;
	private _scrollTimer;

	@ViewChild('scrollable') scrollable: ElementRef;
	@ViewChild('viewPort') viewPort: ElementRef;

	@Input() private timespan: TimespanModel;
	@Input() private type;
	@Input() private imagesPerRow: number;
	@Input() private incrementBy: string;
	@Input() public baseURL: string;

//----------------------------------------------------------------------------------------------------------------------

	constructor(private _thumbnailService: ThumbnailService, private _elm: ElementRef, private _render: Renderer2){}

//----------------------------------------------------------------------------------------------------------------------

	ngOnInit(){
		//for purposes of code challenge i will hardcode the time
		this._from = 1500348260;
		this._to = 1503031520;
		this._timespanHMS = this._setTimeSpanHMS(this.timespan.hours.value, this.timespan.minutes.value, this.timespan.seconds.value);

		this.timespan.form.valueChanges.subscribe(changes => {
			this._timespanHMS = this._setTimeSpanHMS(changes.hours, changes.minutes, changes.seconds);
		});

		this._thumbnailService.imagesPerRow = this.imagesPerRow;
		this._thumbnailService.baseURL = this.baseURL;
		this._thumbnailService.itemHeight = 260;
		this.pageHeight = document.documentElement.clientHeight;

		let a = this._to - this._from;
		this.itemTotal = (a / this._timespanHMS);
		this.rowTotal = this.itemTotal / this.imagesPerRow;

		//set height of div
		let height = Math.ceil((this.itemTotal / this.imagesPerRow) * this.rowHeight);
		this._render.setStyle(this.scrollable.nativeElement, 'height', height+'px');


		//figure out first load how many rows fit
		this._handleScroll();
	}

//----------------------------------------------------------------------------------------------------------------------

	@HostListener('window:scroll', ['$event']) onScroll($event)
	{
		if(this._scrollTimer) clearTimeout(this._scrollTimer);
		this._scrollTimer = setTimeout(this._handleScroll.bind(this), 500);
	}

//----------------------------------------------------------------------------------------------------------------------

	private _handleScroll()
	{
		this.scrollPosition = document.documentElement.scrollTop - 127;
		if(this.scrollPosition < 0) this.scrollPosition = 0;

		if(document.documentElement.scrollTop < 127) this.yOffset = 127;
		else this.yOffset = 0;
		this.scrollDivHeight = this.pageHeight - this.yOffset;

		this._calculateItemsFromScroll();
	}

//----------------------------------------------------------------------------------------------------------------------

	private _setTimeSpanHMS(hours: number, minutes: number, seconds: number)
	{
		return parseInt((hours * 3600).toString()+(minutes * 60).toString()+seconds.toString());
	}

//----------------------------------------------------------------------------------------------------------------------

	private _calculateItemsFromScroll()
	{
		let rowPosition = Math.floor(this.scrollPosition / this.rowHeight);

		let startTimeOffset = (this._timespanHMS * rowPosition) * this.imagesPerRow;

		let yPosition = Math.ceil(rowPosition * this.rowHeight);

		this._render.setStyle(this.viewPort.nativeElement, 'top', yPosition+'px');

		let rows = Math.ceil(this.scrollDivHeight / this.rowHeight) + 1;


		let timeIncrease = startTimeOffset;
		let cols = rows * this.imagesPerRow;
		if(!cols) return;
		this.rowTimes = [];

		let row = [];
		let rowCount = 0;
		for(var i = 0; i < cols; i++)
		{
			if(i !== 0 && i % this.imagesPerRow === 0)
			{
				this.rowTimes[rowCount] = row[0].plusTime;
				this.rows[rowCount] = row;
				row = [];
				rowCount++;
			}
			let url = this.baseURL + (this._from+timeIncrease)
			url += '.'+this.type.image;
			row.push({src: url, plusTime: timeIncrease});
			timeIncrease += this._timespanHMS;
		}
		this.rowTimes[rowCount] = row[0].plusTime;
		this.rows[rowCount] = row;

	}

}
