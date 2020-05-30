import { FormControl } from './FormControl';
import {ValidationError} from './ValidationError'

export interface ValidatorFn {
  (control: FormControl): ValidationError;
}
