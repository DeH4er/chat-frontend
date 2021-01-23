import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ChannelDto } from '../channel.dto';

@Component({
  selector: 'app-channel-list',
  templateUrl: './channel-list.component.html',
  styleUrls: ['./channel-list.component.less'],
})
export class ChannelListComponent {
  @Input()
  channels: ChannelDto[] = [];

  @Input()
  selectedChannelId: number | undefined;

  @Output()
  channelSelected: EventEmitter<number> = new EventEmitter();

  channelClicked(channel: ChannelDto) {
    this.channelSelected.emit(channel.id);
  }
}
