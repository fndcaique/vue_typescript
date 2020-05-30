import {Subject} from 'rxjs'
// eslint-disable-next-line import/no-cycle
import { ValidatorFn } from './ValidatorFn';

export interface FormControlInterface{

  id?: string;
  label?: string;
  placeholder?: string;
  readOnly?: boolean;
  value?: any;
}

export class FormControl implements FormControlInterface {

  id: string

  label: string

  placeholder: string;

  readOnly: boolean

  private _value: string;

  validations: ValidatorFn[];

  _touched: boolean;

  _dirty: boolean;

  private _errors: string[];

  private subjectValue: Subject<string>;

  constructor(
    v: FormControlInterface = {},
    validations: ValidatorFn[] = []) {

    this.id = v.id ? v.id : ''
    this.label = v.label ? v.label : ''
    this.placeholder = v.placeholder ? v.placeholder : ''
    this._value = v.value? v.value : ''
    this.readOnly = !!v.readOnly

    this.validations = validations;

    this._touched = false;
    this._dirty = false;
    this._errors = []
    this._executeValidations()

    this.subjectValue = new Subject()

  }

  private _executeValidations() {
    this._errors = []
    // eslint-disable-next-line no-restricted-syntax
    for (const f of this.validations) {
      const result = f(this);


      if (result.error) {
        this._errors.push(result.message)
      }
    }


  }

  get valid() {
    return this._errors && this._errors.length === 0;
  }

  get errors() {
    return this._errors.map(v => v)
  }

  reset() {
    this.value= ''
    this._touched = false;
    this._dirty = false;
  }

  get value() {
    return this._value
  }

  set value(value) {
    if(value !== this._value)
      this._changeValue(value)
  }

  private _changeValue(value: any) {

    this._value = value;

    this._executeValidations()
    this.subjectValue.next(value)
  }

  get valueChanges() {
    return this.subjectValue.asObservable()
  }

  get dirty() {
    return this._dirty;
  }

  set dirty(v) {
    if (v) {
      this._dirty = v;
      this._executeValidations()
    }
  }

  get touched() {
    return this._touched;
  }

  set touched(v) {
    if (v) {
      this._touched = v;
      this._executeValidations()
    }
  }

}
