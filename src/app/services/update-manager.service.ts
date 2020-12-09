import { HostListener, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { BaseShape } from '../components/objects/base.shape';

@Injectable({
  providedIn: 'root'
})
export class UpdateManagerService {
  updateEvent: Subject<number> = new Subject<number>();
  mouseLocationChanged: Subject<MouseLocation> = new Subject<MouseLocation>();
  startTime: Date;
  context2d: CanvasRenderingContext2D;



  constructor() {
    this.update();
    fromEvent(document, 'mousemove')
      .subscribe((e: MouseEvent) => {
        this.mouseLocationChanged.next({
          x: e.x,
          y: e.y
        })
      });
  }

  update() {
    if (this.context2d) this.context2d.clearRect(0, 0, window.innerWidth, window.innerHeight);
    this.updateEvent.next(this.dt());
    setTimeout(() => requestAnimationFrame(this.update.bind(this)))
  }

  dt(): number {
    if (!this.startTime) {
      this.startTime = new Date();
      return 0;
    }
    const endTime = new Date();
    let timeDiff: number = endTime.valueOf() - this.startTime.valueOf(); //in ms
    timeDiff /= 1000;
    this.startTime = new Date();
    return timeDiff;
  };

  setContext2d(context2d: CanvasRenderingContext2D) {
    this.context2d = context2d;
  }

}



export interface MouseLocation {
  x: number;
  y: number;
}