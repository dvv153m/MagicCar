import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { CanCommand } from '../model/canCommand';
import { Guid } from '../model/guid';
import { MqttService } from '../services/mqtt.service';

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

    this.scoutCan = new CanCommand();
    this.scoutCan.name = "Status central locking";
    this.scoutCan.canBusNumber = "0";
    this.scoutCan.idRequest = "740";
    this.scoutCan.idAnswer = "748";
    this.scoutCan.data = "03 22 41 7F 00 00 00 00";
    
    this.answer = "";
  }

  sendCommand(): void {

    let sc = this.scoutCan;
    //this.mqttService.send()
  }

  saveCommand(): void {    

    this.dataService.addCanCommand(this.scoutCan);
  }

  back_click(): void {

    this.router.navigate(['']);
  }
}