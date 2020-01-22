import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CanCommand } from '../model/canCommand';
import { DataService } from '../services/data.service';
import { Guid } from '../model/guid';
import { onsNotification } from 'ngx-onsenui'
import { MqttService } from '../services/mqtt.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'main',
    templateUrl: './main.component.html',
    providers: []
})

export class MainComponent {

    params = environment;
    canCommands: CanCommand[];
    isVisibleProgressBar = false;

    constructor(private router: Router,
        private dataService: DataService,
        private mqttService: MqttService) {

        /*this.scoutCan = new CanCommand();        
        this.scoutCan.canBusNumber = "0";
        this.scoutCan.idRequest = "740";
        this.scoutCan.idAnswer = "748";
        this.scoutCan.data = "03 22 41 7F 00 00 00 00";*/
    }

    bufferToHex(buffer): string {
        return Array
            .from(new Uint8Array(buffer))
            .map(b => b.toString(16).padStart(2, "0"))
            .join(" ");
    }

    ngOnInit(): void {

        //localStorage.clear();        
        this.canCommands = this.dataService.getCanCommands();
        this.mqttService.init("m12.cloudmqtt.com", 30989, "sirglnjd", "aOT8BRDcRi-Q");

        this.mqttService.ConnectedIn.on(() => {

            this.mqttService.subscribe("Answer");
            this.params.statusConnectionColor = "rgb(5, 236, 24)";
        });

        this.mqttService.MessageArriveIn.on((answer?) => {

            if (this.params.isShowNotification) {

                let strAnswer = this.bufferToHex(answer).toUpperCase();
                onsNotification.toast(strAnswer, { timeout: 3250 });
            }
        });

        this.mqttService.FailIn.on((message?) => {

            this.params.statusConnectionColor = "red";
            setTimeout(() => {

                this.mqttService.reconnect();
            }, 1500);
        });

        this.mqttService.connect();
    }

    cmd_click($event): void {

        this.params.isShowNotification = true;
        this.showProgressBar();

        let commandId = $event.target.id;
        let command: CanCommand = this.dataService.getCommandById(commandId);
        let bytes: Uint8Array = command.getBytes();

        this.mqttService.send(bytes);

        setTimeout(() => {

            this.hideProgressBar();
        }, 3500);
    }

    edit_click($event): void {

        let commandId = $event.target.id;
        this.dataService.setCurrentCanCommand(commandId);
        this.router.navigate(['detail']);
    }

    delete_click($event): void {

        let commandId = $event.target.id;
        let command = this.dataService.getCommandById(commandId);

        onsNotification.confirm({
            message: "Are you sure that you want to remove command " + command.name + " ?",
            cancelable: true,
            callback: i => {

                if (i == 1) { //1-ok; 0-cancell

                    this.dataService.delete(commandId);
                    this.canCommands = this.dataService.getCanCommands();
                }
            }
        });
    }

    addCommand_click(): void {

        let command = new CanCommand();
        command.id = Guid.newGuid();
        this.dataService.addCurrentCanCommand(command);

        this.router.navigate(['detail']);
    }

    showProgressBar(): void {

        this.isVisibleProgressBar = true;
    }

    hideProgressBar(): void {

        this.isVisibleProgressBar = false;
    }
}