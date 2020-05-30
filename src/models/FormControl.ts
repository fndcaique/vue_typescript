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

  value: any;

  validations: ((formControl: FormControl) => { error: boolean; message: string })[];

  touched: boolean;

  dirty: boolean;

  valid: boolean;

  errors: string[];

  constructor(
    v: FormControlInterface = {},
    validations: ((formControl: FormControl) => {error: boolean; message: string})[] = []) {

    this.id = v.id ? v.id : ''
    this.label = v.label ? v.label : ''
    this.placeholder = v.placeholder ? v.placeholder : ''

    this.readOnly = !!v.readOnly

    this.validations = validations;

    this.touched = false;
    this.dirty = false;
    this.valid = true;
    this.errors = []
    this.executeValidations()

  }

  executeValidations() {
    this.errors = []
    // eslint-disable-next-line no-restricted-syntax
    for (const f of this.validations) {
      const result = f(this);
      if (result.error) {
        this.errors.push(result.message)
      }
    }
  }

  reset() {
    // this.id = '',
    // this.label= '',
    // this.placeholder= '',
    // this.readOnly= false,
    this.value= null
    this.touched = false;
    this.dirty = false;
    this.valid = !this.validations || this.validations.length === 0;
  }

  // get value() {
  //   return this.IFormControl.value
  // }

}
