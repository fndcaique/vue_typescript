export interface BaseForm {
  onSubmit(): void;
  isValid(): boolean;
  reset(): void;
}
