import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: any = () => {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouch: any = () => {};

  @Input()
  type = 'text';

  @Input()
  className = '';

  @Input()
  value = '';

  @Input()
  placeholder = '';

  @Input()
  label = '';

  @Input()
  error: string | void = '';

  @Input()
  invalid = false;

  @Input()
  disabled = false;

  @Output()
  valueChange: EventEmitter<string> = new EventEmitter();

  modelChanged(value: string) {
    this.value = value;
    this.valueChange.emit(this.value);
    this.onChange(value);
    this.onTouch(value);
  }

  writeValue(value: any): void {
    this.modelChanged(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
