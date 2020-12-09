import { MouseLocation, UpdateManagerService } from 'src/app/services/update-manager.service';
import { BaseShape, Shape } from './base.shape';


export class CircleShape extends BaseShape implements Shape {
    radius: number = Math.random() * 5 + 2;
    speed: number = Math.random() * 1.2 + 0.2;
    xDirection: number = Math.random() >= 0.5 ? 1 : -1;
    yDirection: number = Math.random() >= 0.5 ? 1 : -1;
    type: CircleType = Math.random() > 0.95 ? CircleType.RED : CircleType.WHITE;
    mouseLocation: MouseLocation;
    lineDistance: number;
    constructor(updateManager: UpdateManagerService, context2D: CanvasRenderingContext2D) {
        super(updateManager, context2D);
        updateManager.updateEvent.subscribe((dt) => {
            this.update();
        });
        updateManager.mouseLocationChanged.subscribe((mouseLocation) => {
            this.mouseLocation = mouseLocation;
        });
        this.lineDistance = this.type === CircleType.WHITE ? 150 : 500;
    }

    update(): void {
        this.updateLocation();
        this.drawCircle();
        this.checkLine();
    }
    drawCircle() {
        this.context2D.beginPath();
        this.context2D.fillStyle = this.getColor();
        this.context2D.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        this.context2D.fill();
    }
    updateLocation() {
        this.x += this.speed * this.xDirection;
        this.y += this.speed * this.yDirection;
        this.checkDirection();
    }
    checkLine() {
        if (this.mouseLocation) {
            const x = Math.abs(this.x - this.mouseLocation.x);
            const y = Math.abs(this.y - this.mouseLocation.y);
            const dist = Math.sqrt(x * x + y * y);
            if (dist < this.lineDistance) {
                this.drawLine();
            }
        }
    }
    drawLine() {
        const grad = this.context2D.createLinearGradient(this.x, this.y, this.mouseLocation.x, this.mouseLocation.y);
        grad.addColorStop(0, this.getColor());
        grad.addColorStop(1, "#70ff9d");
        this.context2D.strokeStyle = grad;
        this.context2D.beginPath();
        this.context2D.moveTo(this.x, this.y);
        this.context2D.lineTo(this.mouseLocation.x, this.mouseLocation.y);
        this.context2D.stroke();
    }
    checkDirection() {
        const nextXValue = this.x + (this.speed + this.radius) * this.xDirection;
        const nextYValue = this.y + (this.speed + this.radius) * this.yDirection;
        if (nextXValue < 0 || nextXValue > window.innerWidth) {
            this.xDirection = -1 * this.xDirection;
        }
        if (nextYValue < 0 || nextYValue > window.innerHeight) {
            this.yDirection = -1 * this.yDirection;
        }
    }
    getColor(): string {
        switch (this.type) {
            case CircleType.WHITE:
                return "#ffffff";
            case CircleType.RED:
                return "#70ff9d";
        }
    }
}





export enum CircleType {
    RED = "red",
    WHITE = "white"
}