import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../services/api.service';
import { SseService } from '../services/sse.service';
import { ChannelDto } from './channel.dto';
import { MessageDto } from './message.dto';

@Injectable({
  providedIn: 'root',
})
export class ChannelService {
  constructor(private api: ApiService, private sse: SseService) {}

  getChannel(channelId: number): Observable<ChannelDto> {
    return this.api.get(`channel/${channelId}`);
  }

  getChannels(): Observable<ChannelDto[]> {
    return this.api.get('channel');
  }

  sendMessage(channelId: number, message: string): Observable<void> {
    return this.api.post(`channel/${channelId}/message`, { message });
  }

  getMessages$(channelId: number): Observable<MessageDto> {
    return this.sse.get(`channel/${channelId}/message-sse`);
  }
}
