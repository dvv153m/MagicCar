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

    getCommandById(id: string): CanCommand {

        let canCommands = this.getCanCommands();
        let devices = canCommands.filter(d => d.id == id);
        if (devices.length > 0) {

            let command = new CanCommand();
            command.name = devices[0].name;
            command.canBusNumber = devices[0].canBusNumber;
            command.idRequest = devices[0].idRequest;
            command.idAnswer = devices[0].idAnswer;
            command.data = devices[0].data;
            command.id = devices[0].id;            
            return command;
        }
        return new CanCommand();
    }

    delete(id: string): void {

        let canCommands: Array<CanCommand> = JSON.parse(localStorage.getItem(this.CanCommandsKey));
        let commands = canCommands.filter(d => d.id != id);
        let cmdJson = JSON.stringify(commands);
        localStorage.setItem(this.CanCommandsKey, cmdJson);
    }

    getCanCommands(): CanCommand[] {

        let restoreCanCommands: CanCommand[] = JSON.parse(localStorage.getItem(this.CanCommandsKey));
        return restoreCanCommands;
    }

    setCurrentCanCommand(id: string): void {

        let command = this.getCommandById(id);        
        let cmdJson = JSON.stringify(command);
        localStorage.setItem(this.CurrentCanCommandKey, cmdJson);
    }

    addCurrentCanCommand(cmd: CanCommand) {

        let cmdJson = JSON.stringify(cmd);
        localStorage.setItem(this.CurrentCanCommandKey, cmdJson);        
    }

    addOrUpdateCanCommand(cmd: CanCommand){

        this.addCurrentCanCommand(cmd);

        let restoreCanCommands: Array<CanCommand> = JSON.parse(localStorage.getItem(this.CanCommandsKey));
        if (restoreCanCommands != null){
        
            let commands: CanCommand[] = restoreCanCommands.filter(d => d.id == cmd.id);            
            if(commands == null || commands.length == 0){
                restoreCanCommands.push(cmd);
            }
            else{

                commands[0].name = cmd.name;
                commands[0].canBusNumber = cmd.canBusNumber;
                commands[0].idRequest = cmd.idRequest;
                commands[0].idAnswer = cmd.idAnswer;
                commands[0].data = cmd.data;                            
            }
        }
        else{

            restoreCanCommands = new Array<CanCommand>();
            restoreCanCommands.push(cmd);
        }

        let restoreDevicesJson = JSON.stringify(restoreCanCommands);
        localStorage.setItem(this.CanCommandsKey, restoreDevicesJson);
    }
}