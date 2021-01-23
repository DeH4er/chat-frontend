import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';

import { ChannelDto } from '../channel.dto';
import { MessageDto } from '../message.dto';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChannelComponent {
  @ViewChild('messagesDiv')
  messagesDiv!: ElementRef;

  @Input()
  messages: MessageDto[] = [];

  @Input()
  channel: ChannelDto | undefined;

  @Input()
  scrollDown$!: Observable<void>;

  @Output()
  sendMessage: EventEmitter<string> = new EventEmitter();

  onSendMessage(message: string) {
    this.sendMessage.emit(message);
  }
}
