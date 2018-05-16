import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
export class TimespanModel
{

	public form: FormGroup;
	public from: FormControl;
	public to: FormControl;
	public hours: FormControl;
	public minutes: FormControl;
	public seconds: FormControl;

//----------------------------------------------------------------------------------------------------------------------

	constructor(from: Date = null, to: Date = null)
	{
		this._createFormControls(this._convertDateToNgbDateStruct(from), this._convertDateToNgbDateStruct(to));
		this._createForm();
	}

//----------------------------------------------------------------------------------------------------------------------

	private _createFormControls(from, to)
	{
		this.from = new FormControl(from, Validators.required);
		this.to = new FormControl(to, Validators.required);
		this.hours = new FormControl(0, Validators.required);
		this.minutes = new FormControl(0, Validators.required);
		this.seconds = new FormControl(20, Validators.required);
	}

//----------------------------------------------------------------------------------------------------------------------

	private _createForm()
	{
		this.form = new FormGroup({
			from: this.from,
			to: this.to,
			hours: this.hours,
			minutes: this.minutes,
			seconds: this.seconds
		});
	}

//----------------------------------------------------------------------------------------------------------------------


	private _convertDateToNgbDateStruct(date): Object
	{
		if(!date) return '';
		return {year: date.getFullYear(), month: (date.getMonth() !== 0 ? date.getMonth()+1 : 1), day: date.getDate(), hours: date.getHours(), minutes: date.getMinutes(), seconds: date.getSeconds()};
	}

//----------------------------------------------------------------------------------------------------------------------


}