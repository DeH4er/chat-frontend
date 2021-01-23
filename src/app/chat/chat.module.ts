import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ChannelComponent } from './channel/channel.component';
import { ChannelListComponent } from './channel-list/channel-list.component';
import { ChatComponent } from './chat.component';
import { ChatRoutingModule } from './chat-routing.module';
import { MessageComponent } from './message/message.component';
import { WriteMessageComponent } from './write-message/write-message.component';

@NgModule({
  declarations: [
    ChatComponent,
    ChannelListComponent,
    ChannelComponent,
    MessageComponent,
    WriteMessageComponent,
  ],
  imports: [CommonModule, ChatRoutingModule, SharedModule],
})
export class ChatModule {}
