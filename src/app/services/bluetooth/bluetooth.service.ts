import { Injectable } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class BluetoothService {

  unpairedDevices: any;
  pairedDevices: any;
  gettingDevices: boolean;
  dataSend = "";

  constructor(private bluetoothSerial: BluetoothSerial, private alertController: AlertController) { 
    bluetoothSerial.enable();
  }

  startScanning() {
    this.pairedDevices = null;
    this.unpairedDevices = null;
    this.gettingDevices = true;
    const unPair = [];
    this.bluetoothSerial.discoverUnpaired().then((success) => {
      success.forEach((value, key) => {
        var exists = false;
        unPair.forEach((val2, i) => {
          if (value.id === val2.id) {
            exists = true;
          }
        });
        if (exists === false && value.id !== '') {
          unPair.push(value);
        }
      });
      this.unpairedDevices = unPair;
      this.gettingDevices = false;
    },
      (err) => {
        console.log(err);
      });
  
    this.bluetoothSerial.list().then((success) => {
      this.pairedDevices = success;
    },
      (err) => {
  
      });
  }
  
  success = (data) => {
    this.deviceConnected();
  }
  fail = (error) => {
    alert(error);
  }
  
  async selectDevice(id: any) {
  
    const alert = await this.alertController.create({
      header: 'Connect',
      message: 'Do you want to connect with?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Connect',
          handler: () => {
            this.bluetoothSerial.connect(id).subscribe(this.success, this.fail);
          }
        }
      ]
    });
    await alert.present();
  }
  
  deviceConnected() {
    this.bluetoothSerial.isConnected().then(success => {
      alert('Connected Successfullly');
    }, error => {
      alert('error' + JSON.stringify(error));
    });
  }
  
  async disconnect() {
    const alert = await this.alertController.create({
      header: 'Disconnect?',
      message: 'Do you want to Disconnect?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Disconnect',
          handler: () => {
            this.bluetoothSerial.disconnect();
          }
        }
      ]
    });
    await alert.present();
  }



  //ENVIAR DATOS 
  async alert(header, msg: string) {
    const alert = await this.alertController.create({
      header: header,
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }

  sendData(dataToSend: string) {
    this.dataSend = "\n";
    this.dataSend += dataToSend;
    this.bluetoothSerial.write(this.dataSend).then(success => {
      this.alert('Comando enviado!', this.dataSend);
    }, error => {
      this.alert('Error al enviar comando', 'intentelo nuevamente');
    });
  }


  readData(){
    this.bluetoothSerial.read().then(success => {
      this.alert('Lectura de datos', success);
    }, failure => {
      this.alert('Error al leer datos', failure);
    });
  }
}
