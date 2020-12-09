import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { UpdateManagerService } from 'src/app/services/update-manager.service';
import { CircleShape } from '../objects/circle.shape';

@Component({
  selector: 'app-canvas-background',
  templateUrl: './canvas-background.component.html',
  styleUrls: ['./canvas-background.component.scss']
})
export class CanvasBackgroundComponent implements OnInit, AfterViewInit {
  @ViewChild('canvasContainer') private canvasContainer: ElementRef;
  viewWidth: number = 0;
  viewHeight: number = 0;
  canvas: HTMLCanvasElement;
  context2D: CanvasRenderingContext2D;
  circles: number = 150;

  @HostListener('window:resize', ['$event'])
  onResize(event): void {
    this.setCanvasSize();
  }

  constructor(private update: UpdateManagerService) {
    this.setCanvasSize();
    this.update.updateEvent.subscribe((dt)=>{
      //console.log(dt);
    })
  }

  ngOnInit(): void {
  }


  ngAfterViewInit(): void {
    this.initCanvas();
    this.initObjects();
  }
  initObjects() {
    for(let i = 0; i< this.circles; i++){
      const test = new CircleShape(this.update, this.context2D);
    }
   
  }


  initCanvas(): void {
    this.canvas = document.createElement('canvas');
    this.canvasContainer.nativeElement.appendChild(this.canvas);
    this.context2D = this.canvas.getContext('2d');
    this.canvas.style.background = '#313233';
    this.update.setContext2d(this.context2D);
    this.setCanvasSize();
  }

  setCanvasSize(): void {
    this.viewWidth = window.innerWidth;
    this.viewHeight = window.innerHeight;
    if(this.canvas){
      this.canvas.width = this.viewWidth;
      this.canvas.height = this.viewHeight;
    }
  }
}
