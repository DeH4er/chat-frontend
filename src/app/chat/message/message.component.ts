import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { MessageDto } from '../message.dto';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageComponent {
  @Input()
  message: MessageDto | undefined;
}
