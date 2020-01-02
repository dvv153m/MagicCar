import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { CanCommand } from '../model/canCommand';

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

  cmdName: string;
  canBusNumber: string;
  idRequest: string;
  idAnswer: string;
  data: string;
  answer: string;

  constructor(private router: Router,
    private dataService: DataService) { }

  ngOnInit() {

    this.cmdName="Status central locking";
    this.canBusNumber="345";
    this.idRequest="11";
    this.idAnswer="3456";
    this.data="33 56 43 12 45 78 44 22";
    this.answer="12121212";
  }

  sendCommand(): void {

    //alert("1");
  }

  saveCommand(): void {

    let canCommand = new CanCommand();
    canCommand.name = this.cmdName;
    canCommand.canBusNumber = this.canBusNumber;
    canCommand.idRequest = this.idRequest;
    canCommand.idAnswer = this.idAnswer;
    canCommand.data = this.data;

    this.dataService.addCanCommand(canCommand);
  }

  back_click(): void {

    this.router.navigate(['']);
  }
}