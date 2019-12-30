import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'main',
    templateUrl: './main.component.html',
    providers: []
})

export class MainComponent{

    canBusNumber: number = 0;
    idRequest: string = "740";
    idAnswer: string = "748";
    data: string = "03 22 41 7F 00 00 00 00";

    constructor(private router: Router){}

    sendCommand(): void {

        let temp  = parseInt(this.idRequest, 16);//1856
        let t2 = Uint32Array.of(temp);//64,7,0,0
        let arr8 = new Uint8Array(t2.buffer);
        let ff1 = arr8[0];
        let ff2 = arr8[1];
        let ff3 = arr8[2];
        let ff4 = arr8[3];
    
        let pp = this.hexToBytes(this.data.replace(/ /g, ''));

        let arr = new Uint8Array(8+4);
        arr.set(pp, 0);
        arr.set(arr8, 8);
    }

    hexToBytes(hex) : number[] {

        for (var bytes = [], c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
        return bytes;
    }

    addClick(): void {

        //alert("hello");
        this.router.navigate(['detail']);
    }
}