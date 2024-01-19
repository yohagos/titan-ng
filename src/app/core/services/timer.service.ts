import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private timeoutId!: number
  private readonly timeoutDuration = 30000
  private userInteractionSubject = new Subject<void>()

  userInteraction$ = this.userInteractionSubject.asObservable()

  startTime() {
    this.clearTimer()
    this.timeoutId = window.setTimeout(() => {
      this.userInteractionSubject.next()
    }, this.timeoutDuration)
  }

  clearTimer() {
    if (this.timeoutId) {
      window.clearTimeout(this.timeoutId)
    }
  }
}
