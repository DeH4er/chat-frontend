import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.less'],
})
export class ButtonComponent {
  @Input()
  className = '';

  @Input()
  color = '';

  @Input()
  disabled = false;

  @Input()
  loading = false;

  @Output()
  click: EventEmitter<void> = new EventEmitter();
}
