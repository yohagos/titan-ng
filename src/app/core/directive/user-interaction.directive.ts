import { Directive, ElementRef, HostListener } from '@angular/core';
import { TimerService } from '../services/timer.service';

@Directive({
  selector: '[appUserInteraction]'
})
export class UserInteractionDirective {

  constructor(
    private timerService: TimerService,
    private elem: ElementRef,
  ) { }

  @HostListener('document:click', ['$event'])
  @HostListener('document:keydown', ['$event'])
  onUserInteraction(event: Event) {
    this.timerService.startTime()
  }

}
