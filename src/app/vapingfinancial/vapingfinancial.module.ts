import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VapingfinancialPage } from './vapingfinancial.page';

const routes: Routes = [
  {
    path: '',
    component: VapingfinancialPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VapingfinancialPage]
})
export class VapingfinancialPageModule {}
