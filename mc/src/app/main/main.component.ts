import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CanCommand } from '../model/canCommand';

@Component({
    selector: 'main',
    templateUrl: './main.component.html',
    providers: []
})

export class MainComponent{
    
    scoutCan: CanCommand;

    constructor(private router: Router){

        this.scoutCan = new CanCommand();        
        this.scoutCan.canBusNumber = "0";
        this.scoutCan.idRequest = "740";
        this.scoutCan.idAnswer = "748";
        this.scoutCan.data = "03 22 41 7F 00 00 00 00";
    }

    sendCommand(): void {
        
        let bytes = this.scoutCan.getBytes();                               
    }

        

    addCommand_click(): void {

        this.router.navigate(['detail']);
    }
}