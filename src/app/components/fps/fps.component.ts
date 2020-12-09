import { Component, OnDestroy, OnInit } from '@angular/core';
import { UpdateManagerService } from '../../services/update-manager.service';

@Component({
  selector: 'app-fps',
  templateUrl: './fps.component.html',
  styleUrls: ['./fps.component.scss']
})
export class FpsComponent implements OnDestroy {
  private frameCounter: number = 0;
  public fps: number = 0;
  fpsInterval: any;
  constructor(private update: UpdateManagerService) {
    this.update.updateEvent.subscribe(()=>{
      this.frameCounter++;
    });
    this.fpsInterval = setInterval(()=>{
      this.fps = this.frameCounter;
      this.frameCounter = 0;
    }, 1000)
  }
  ngOnDestroy(): void {
    clearInterval(this.fpsInterval)
  }


}
