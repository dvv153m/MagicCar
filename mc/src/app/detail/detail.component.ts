import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'detail',
    templateUrl: './detail.component.html',
    providers: []
  })

  export class DetailComponent {

    cmdName: string;
    canBusNumber: string;
    idRequest: string;
    idAnswer: string;
    data: string;
    answer: string;

    constructor(private router: Router){}

    ngOnInit(){
        
      this.cmdName="Status central locking";
      this.canBusNumber="345";
      this.idRequest="11";
      this.idAnswer="3456";
      this.data="33 56 43 12 45 78 44 22";
      this.answer="12121212";
    }

    back_click(): void {

      this.router.navigate(['']);
    }
  }