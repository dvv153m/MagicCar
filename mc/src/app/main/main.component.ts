import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'main',
    templateUrl: './main.component.html',
    providers: []
})

export class MainComponent{

    constructor(private router: Router){}

    addClick(): void{

        //alert("hello");
        this.router.navigate(['detail']);
    }
}