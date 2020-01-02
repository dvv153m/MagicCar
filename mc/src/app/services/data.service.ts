import { Injectable } from '@angular/core';
import { CanCommand } from '../model/canCommand';

@Injectable({
    providedIn: 'root',
})
export class DataService {

    private CanCommandsKey: string = "canCommands";
    private CurrentCanCommandKey: string = "currentCanCommand";

    getCurrentCanCommand(): CanCommand {

        let restoreCanCommand: CanCommand = JSON.parse(localStorage.getItem(this.CurrentCanCommandKey));
        return restoreCanCommand;
    }

    getCanCommands(): CanCommand[] {

        let restoreCanCommands: CanCommand[] = JSON.parse(localStorage.getItem(this.CanCommandsKey));
        return restoreCanCommands;
    }

    setCurrentCanCommand(cmd: CanCommand): void {

        let cmdJson = JSON.stringify(cmd);
        localStorage.setItem(this.CurrentCanCommandKey, cmdJson);
    }

    addCurrentCanCommand(cmd: CanCommand) {

        let cmdJson = JSON.stringify(cmd);
        localStorage.setItem(this.CurrentCanCommandKey, cmdJson);
    }

    addCanCommand(cmd: CanCommand){

        this.addCurrentCanCommand(cmd);

        let restoreCanCommands: Array<CanCommand> = JSON.parse(localStorage.getItem(this.CanCommandsKey));
        if (restoreCanCommands != null){
        
            restoreCanCommands.push(cmd);
        }
        else{

            restoreCanCommands = new Array<CanCommand>();
            restoreCanCommands.push(cmd);
        }

        let restoreDevicesJson = JSON.stringify(restoreCanCommands);
        localStorage.setItem(this.CanCommandsKey, restoreDevicesJson);
    }
}