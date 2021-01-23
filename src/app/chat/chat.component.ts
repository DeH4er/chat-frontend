import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';

import { ChannelDto } from './channel.dto';
import { ChannelService } from './channel.service';
import { MessageDto } from './message.dto';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.less'],
})
export class ChatComponent implements OnInit, OnDestroy {
  selectedChannelId: number | undefined;
  destroy$: Subject<void> = new Subject();
  channels: ChannelDto[] | undefined;
  channel: ChannelDto | undefined;
  messages: MessageDto[] = [];

  constructor(
    private channelService: ChannelService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadChannels();
    this.subscribeToChannel();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  channelSelected(channelId: number) {
    this.selectedChannelId = channelId;
    this.router.navigate([`/chat/${channelId}`]);
  }

  sendMessage(message: string) {
    if (!this.channel) {
      throw new Error('No channel selected');
    }

    this.channelService
      .sendMessage(this.channel.id, message)
      .pipe()
      .subscribe();
  }

  private subscribeToChannel() {
    this.route.params
      .pipe(
        takeUntil(this.destroy$),
        map((p) => parseInt(p.channelId)),
        filter((p) => !!p && !Number.isNaN(p)),
        switchMap((channelId: number) =>
          this.channelService.getChannel(channelId)
        ),
        tap((channel: ChannelDto) => {
          this.selectedChannelId = channel.id;
          this.channel = channel;
          this.messages = [];
        }),
        switchMap((channel: ChannelDto) =>
          this.channelService.getMessages$(channel.id)
        )
      )
      .subscribe((message: MessageDto) => {
        this.messages = [...this.messages, message];
      });
  }

  private loadChannels() {
    this.channelService
      .getChannels()
      .pipe(takeUntil(this.destroy$))
      .subscribe((channels: ChannelDto[]) => {
        this.channels = channels;
      });
  }
}
