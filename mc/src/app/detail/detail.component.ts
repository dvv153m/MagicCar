import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { CanCommand } from '../model/canCommand';
import { MqttService } from '../services/mqtt.service';
import { onsNotification } from 'ngx-onsenui'

@Component({
  selector: 'detail',
  templateUrl: './detail.component.html',
  providers: []
})

export class DetailComponent {

  selectedCanBusNumber: string = '0';
  canBusNumbers = [
    { value: '0', label: '0' },
    { value: '1', label: '1' }
  ];

  answer: string;
  scoutCan: CanCommand;

  constructor(private router: Router,
    private dataService: DataService,
    private mqttService: MqttService) { }

  ngOnInit() {

    this.scoutCan = this.dataService.getCurrentCanCommand();
    this.selectedCanBusNumber = this.scoutCan.canBusNumber;
    /*this.scoutCan = new CanCommand();
    this.scoutCan.id = Guid.newGuid();
    this.scoutCan.name = "Status central locking";
    this.scoutCan.canBusNumber = "0";
    this.scoutCan.idRequest = "740";
    this.scoutCan.idAnswer = "748";
    this.scoutCan.data = "03 22 41 7F 00 00 00 00";*/
    
    this.answer = "";
  }

  sendCommand(): void {

    let sc = this.scoutCan;
    //this.mqttService.send()
    onsNotification.toast('Send command', {timeout: 1250});
  }

  saveCommand(): void {    

    this.scoutCan.canBusNumber = this.selectedCanBusNumber;
    this.dataService.addOrUpdateCanCommand(this.scoutCan);
    onsNotification.toast('Save command', {timeout: 1250});
  }

  back_click(): void {

    this.router.navigate(['']);
  }
}