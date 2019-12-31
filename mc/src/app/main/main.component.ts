import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { ScoutCan } from '../model/scoutCan';

@Component({
    selector: 'main',
    templateUrl: './main.component.html',
    providers: []
})

export class MainComponent{
    
    scoutCan: ScoutCan;

    constructor(private router: Router){

        this.scoutCan = new ScoutCan();
        this.scoutCan.type = "7FCE";
        this.scoutCan.canBusNumber = "0";
        this.scoutCan.idRequest = "740";
        this.scoutCan.idAnswer = "748";
        this.scoutCan.data = "03 22 41 7F 00 00 00 00";
    }

    sendCommand(): void {
        
        let typeInt  = parseInt(this.scoutCan.type, 16);
        let typeArray16 = Uint16Array.of(typeInt);
        let typeArray8 = new Uint8Array(typeArray16.buffer);

        let canBusNumberInt  = parseInt(this.scoutCan.canBusNumber, 16);
        let canBusNumber16 = Uint16Array.of(canBusNumberInt);
        let canBusNumber8 = new Uint8Array(canBusNumber16);

        let idRequestInt  = parseInt(this.scoutCan.idRequest, 16);
        let idRequesArrayt32 = Uint32Array.of(idRequestInt);
        let idRequesArrayt8 = new Uint8Array(idRequesArrayt32.buffer);
        
        let idAnswerInt  = parseInt(this.scoutCan.idAnswer, 16);
        let idAnswerArrayt32 = Uint32Array.of(idAnswerInt);
        let idAnswerArrayt8 = new Uint8Array(idAnswerArrayt32.buffer);
    
        let dataArray = this.hexToBytes(this.scoutCan.data.replace(/ /g, ''));

        var dataArrayLen = new Uint8Array(1);
        dataArrayLen[0] = dataArray.length;

        let result = new Uint8Array(typeArray8.byteLength + canBusNumber8.byteLength + idRequesArrayt8.byteLength + idAnswerArrayt8.byteLength + dataArrayLen.length + dataArray.length);
        let offset = 0;        
        result.set(typeArray8, offset);
        offset += typeArray8.byteLength;
        result.set(canBusNumber8, offset);
        offset += canBusNumber8.byteLength;
        result.set(idRequesArrayt8, offset);
        offset += idRequesArrayt8.byteLength;
        result.set(idAnswerArrayt8, offset);
        offset += idAnswerArrayt8.byteLength;
        result.set(dataArrayLen, offset);
        offset += dataArrayLen.length;
        result.set(dataArray, offset);                
    }

    hexToBytes(hex) : number[] {

        for (var bytes = [], c = 0; c < hex.length; c += 2){
         
            bytes.push(parseInt(hex.substr(c, 2), 16));
        }
        return bytes;
    }

    addClick(): void {

        //alert("hello");
        this.router.navigate(['detail']);
    }
}