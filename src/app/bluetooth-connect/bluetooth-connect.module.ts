import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BluetoothConnectPageRoutingModule } from './bluetooth-connect-routing.module';
import { BluetoothConnectPage } from './bluetooth-connect.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BluetoothConnectPageRoutingModule
  ],
  declarations: [BluetoothConnectPage]
})
export class BluetoothConnectPageModule {}
