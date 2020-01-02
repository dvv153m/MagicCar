import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CanCommand } from '../model/canCommand';
import { DataService } from '../services/data.service';
import { Guid } from '../model/guid';

@Component({
    selector: 'main',
    templateUrl: './main.component.html',
    providers: []
})

export class MainComponent{
    
    //scoutCan: CanCommand;
    canCommands: CanCommand[];

    constructor(private router: Router,
                private dataService: DataService){

        /*this.scoutCan = new CanCommand();        
        this.scoutCan.canBusNumber = "0";
        this.scoutCan.idRequest = "740";
        this.scoutCan.idAnswer = "748";
        this.scoutCan.data = "03 22 41 7F 00 00 00 00";*/
    }

    ngOnInit(): void {

        //localStorage.clear();
        this.canCommands = this.dataService.getCanCommands();
    }

    cmd_click($event): void {
        
        let commandId = $event.target.id;
        let command = this.dataService.getCommandById(commandId);
        //this.dataService.setCurrentCanCommand(command);
        //let bytes = this.scoutCan.getBytes();   //                            
    } 
    
    edit_click($event): void{

        let commandId = $event.target.id;
        let command = this.dataService.getCommandById(commandId);
        this.dataService.setCurrentCanCommand(command);
        this.router.navigate(['detail']);
    }

    delete_click($event): void {

        let deviceId = $event.target.id;
        let device = this.dataService.delete(deviceId);
        this.canCommands = this.dataService.getCanCommands();     
      }

    addCommand_click(): void {

        let scoutCan = new CanCommand();
        scoutCan.id = Guid.newGuid();
        this.dataService.addCurrentCanCommand(scoutCan);

        this.router.navigate(['detail']);
    }
}