import { MouseLocation, UpdateManagerService } from 'src/app/services/update-manager.service';
import { BaseShape, Shape } from './base.shape';


export class CircleShape extends BaseShape implements Shape {

    radius: number = Math.random() * 5 + 2;
    speed: number = Math.random() * 1.2 + 0.2;
    xDirection: number = Math.random() >= 0.5 ? 1 : -1;
    yDirection: number = Math.random() >= 0.5 ? 1 : -1;
    type: CircleType = this.randType();
    alpha: number = Math.random() * 2 * Math.PI;
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
        this.lineDistance = this.getDistance();
    }

    update(): void {
        const shouldDrawLine = this.checkLine();
        if (shouldDrawLine) {
            this.drawLine();
            this.followMouse();
        } else {
            this.updateLocation();
        }
        this.drawCircle();
        //this.checkLine();
    }
    followMouse() {
        const alpha = Math.atan2(this.mouseLocation.y - this.y, this.mouseLocation.x - this.x);
        this.x += Math.cos(alpha) * this.speed;
        this.y += Math.sin(alpha) * this.speed;
    }
    drawCircle() {
        this.context2D.beginPath();
        this.context2D.fillStyle = this.getColor();
        this.context2D.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        this.context2D.fill();
    }
    updateLocation() {
        this.x += this.speed * this.xDirection * Math.cos(this.alpha);
        this.y += this.speed * this.yDirection * Math.sin(this.alpha);
        this.checkDirection();
    }
    checkLine(): boolean {
        if (this.mouseLocation) {
            const x = Math.abs(this.x - this.mouseLocation.x);
            const y = Math.abs(this.y - this.mouseLocation.y);
            const dist = Math.sqrt(x * x + y * y);
            if (dist < this.lineDistance) {
                return true;
            }
        }
    }
    drawLine() {
        const grad = this.context2D.createLinearGradient(this.x, this.y, this.mouseLocation.x, this.mouseLocation.y);
        grad.addColorStop(0, this.getColor());
        grad.addColorStop(1, "#ffffff");
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
            case CircleType.GREEN:
                return "#70ff9d";
            case CircleType.BLUE:
                return "#36b8ff";
            case CircleType.PINk:
                return "#ff66d6";
        }
    }

    randType(): CircleType {
        const rand = Math.random();
        if (rand > 0.9) return CircleType.GREEN;
        if (rand > 0.75) return CircleType.PINk;
        if (rand > 0.6) return CircleType.BLUE;
        return CircleType.WHITE;
    }

    getDistance(): number {
        switch (this.type) {
            case CircleType.GREEN:
                return 400;
            case CircleType.PINk:
                return 300;
            case CircleType.BLUE:
                return 200;
            default: return 100;
        }
    }
}





export enum CircleType {
    GREEN = "green",
    WHITE = "white",
    BLUE = "blue",
    PINk = "pink"
}