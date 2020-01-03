import { Paho } from 'ng2-mqtt/mqttws31';
import { LiteEvent } from './lite.event';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class MqttService {

    private mqttClient: Paho.MQTT.Client;
    private mqttHost: string;
    private mqttPort: number;
    private mqttUserName: string;
    private mqttPassword: string;    
    private mqttOptions: any = {};

    private readonly onConnected = new LiteEvent<void>();
    public get ConnectedIn() { return this.onConnected.expose(); }

    private readonly onMessageArrive = new LiteEvent<string>();
    public get MessageArriveIn() { return this.onMessageArrive.expose(); }

    private readonly onFail = new LiteEvent<string>();
    public get FailIn() { return this.onFail.expose(); }

    constructor() {}

     init(host: string, port: number, userName: string, password: string): void {

        this.mqttHost = host;
        this.mqttPort = port;
        this.mqttUserName = userName;
        this.mqttPassword = password;
     }

    connect(): void {

        let mqttPath = "/mqtt";
        let randomId = Math.random() * 100;
        let mqttClientId = "web_" + parseInt(randomId.toString(), 10);        
        this.mqttClient = new Paho.MQTT.Client(this.mqttHost, this.mqttPort, mqttPath, mqttClientId)                        

        this.mqttOptions = this.getMqttOptions();

        this.mqttClient.onConnectionLost = this.onConnectionLost.bind(this);
        this.mqttClient.onMessageArrived = this.onMessageArrived.bind(this);
        this.mqttClient.connect(this.mqttOptions);        
    }

    send(data: Uint8Array): void{
        
        let message = new Paho.MQTT.Message(data);
        message.destinationName = "Request";//topic
        this.mqttClient.send(message);
    }

    reconnect(): void {

        this.mqttOptions = this.getMqttOptions();        
        this.mqttClient.connect(this.mqttOptions);
    }

    onConnect(): void {

        this.onConnected.trigger();
    }

    subscribe(topic: string): void {

        this.mqttClient.subscribe(topic, {});
    }

    onFailure(message): void {

        this.onFail.trigger(message.errorMessage);
    }

    onConnectionLost(responseObject): void {

        if (responseObject.errorCode !== 0) {

            console.log('onConnectionLost:' + responseObject.errorMessage);
        }
    }

    onMessageArrived(message): void {

        this.onMessageArrive.trigger(message.payloadString);
    }

    disconnect() : void {

        try {

            this.mqttClient.disconnect();
        }
        catch(e) {

            console.log(e);
        }        
    }

    getMqttOptions() : any {

        return {

            timeout: 3,
            useSSL: true,
            cleanSession: true,
            userName: this.mqttUserName,
            password: this.mqttPassword,
            onSuccess: this.onConnect.bind(this),
            onFailure: this.onFailure.bind(this)
        };
    }
}