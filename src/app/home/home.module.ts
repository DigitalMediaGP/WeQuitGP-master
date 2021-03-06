import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms'; //quit form test
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import { FirebaseUIModule } from 'firebaseui-angular';
import { AutosizeModule } from 'ngx-autosize';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FirebaseUIModule,
    AutosizeModule,

    RouterModule.forChild(routes)
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
