import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { CanCommand } from '../model/canCommand';
import { MqttService } from '../services/mqtt.service';
import { onsNotification } from 'ngx-onsenui'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'detail',
  templateUrl: './detail.component.html',
  providers: []
})

export class DetailComponent {

  params = environment;
  canBusNumbers = [
    { value: '0', label: '0' },
    { value: '1', label: '1' }
  ];

  txtAnswer: string;
  txtDecodeAnswer: string;
  canCommand: CanCommand;

  constructor(private router: Router,
    private dataService: DataService,
    private mqttService: MqttService) { }

  ngOnInit() {

    this.canCommand = this.dataService.getCurrentCanCommand();
    this.txtAnswer = "";
    this.mqttService.MessageArriveIn.on((answer?) => {
      
      let strAnswer = this.bytesToHex(answer).toUpperCase();
      this.txtAnswer = strAnswer;      
      if(strAnswer == "CD 7F 00 40 07 00 00 48 07 00 00 08 07 62 41 7F 00 42 00 20"){

        this.txtDecodeAnswer = "close";
      }
      else if(strAnswer == "CD 7F 00 40 07 00 00 48 07 00 00 08 07 62 41 7F 00 42 00 30"){
        
        this.txtDecodeAnswer = "open";
      }  
    });
  }

  sendCommand(): void {

    let bytes: Uint8Array = this.canCommand.getBytes();
    this.mqttService.send(bytes);
    onsNotification.toast('Send command', { timeout: 1250 });
  }

  saveCommand(): void {

    this.dataService.addOrUpdateCanCommand(this.canCommand);
    onsNotification.toast('Save command', { timeout: 1250 });
  }

  back_click(): void {

    this.router.navigate(['']);
  }

  bytesToHex (bytes) : string {

    return Array
        .from(new Uint8Array(bytes))
        .map(b => b.toString(16).padStart(2, "0"))
        .join(" ");
}
}