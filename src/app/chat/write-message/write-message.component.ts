import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-write-message',
  templateUrl: './write-message.component.html',
  styleUrls: ['./write-message.component.less'],
})
export class WriteMessageComponent {
  value = '';

  @Output()
  send: EventEmitter<string> = new EventEmitter();

  valueChange(value: string) {
    this.value = value;
  }

  sendMessage() {
    if (!this.value) {
      return;
    }

    const value = this.value;
    this.value = '';
    this.send.emit(value);
  }
}
