import { UpdateManagerService } from 'src/app/services/update-manager.service';


export class BaseShape {
    id: string = newGuid();
    x: number = (window.innerWidth) * Math.random();
    y: number = (window.innerHeight) * Math.random();
    constructor(private updateManager: UpdateManagerService, public context2D: CanvasRenderingContext2D) {
    }
}


export interface Shape {
    update(): void;
}

const newGuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}