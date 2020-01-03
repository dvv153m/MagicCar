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

  canBusNumbers = [
    { value: '0', label: '0' },
    { value: '1', label: '1' }
  ];

  answer: string;
  canCommand: CanCommand;

  constructor(private router: Router,
    private dataService: DataService,
    private mqttService: MqttService) { }

  ngOnInit() {

    this.canCommand = this.dataService.getCurrentCanCommand();        
    this.answer = "";
  }

  sendCommand(): void {
    
    let bytes: Uint8Array = this.canCommand.getBytes();
    this.mqttService.send(bytes);
    onsNotification.toast('Send command', {timeout: 1250});
  }

  saveCommand(): void {    
    
    this.dataService.addOrUpdateCanCommand(this.canCommand);
    onsNotification.toast('Save command', {timeout: 1250});
  }

  back_click(): void {

    this.router.navigate(['']);
  }
}