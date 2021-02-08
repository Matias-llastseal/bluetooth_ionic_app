import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { BluetoothService } from '../services/bluetooth/bluetooth.service';

@Component({
 selector: 'app-home',
 templateUrl: 'home.page.html',
 styleUrls: ['home.page.scss'],
})
export class HomePage {

 constructor(public alertCtrl:AlertController, public bluetoothService:BluetoothService) 
 {
   
 }
 
  eventButton(){
    this.bluetoothService.sendData("ctrl + u");
    
  }
}